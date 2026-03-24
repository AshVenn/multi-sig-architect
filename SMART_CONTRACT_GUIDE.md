# Guide De Compréhension Du Smart Contract

Ce document est fait pour t'aider à comprendre le coeur du projet en te focalisant sur le smart contract [`Wallet.sol`](./blockchain/contracts/Wallet.sol).

L'objectif est double :

- comprendre ce que fait le contrat
- pouvoir répondre à des questions possibles du jury

## 1. Résumé Très Simple Du Projet

Le projet implémente un wallet multisignature.

Idée principale :

- l'argent n'est pas contrôlé par une seule personne
- plusieurs comptes sont autorisés à valider les transferts
- un transfert n'est exécuté que si un nombre minimum d'approbations est atteint

Dans ce projet :

- il y a `3` approvers
- le quorum est `2`
- cela veut dire qu'il faut au moins `2` signatures pour envoyer des fonds

En une phrase :

> Ce smart contract permet de stocker des fonds et de n'exécuter un transfert qu'après validation collective.

## 2. Pourquoi Un Wallet Multisig

Un wallet classique dépend d'une seule clé privée.
Si cette clé est perdue ou compromise, les fonds sont en danger.

Un wallet multisig réduit ce risque :

- il partage le pouvoir entre plusieurs comptes
- il impose une validation collective
- il apporte plus de contrôle et de transparence

Cas d'usage typiques :

- trésorerie d'une équipe
- gestion d'un club ou d'une association
- validation conjointe dans un projet de groupe

## 3. Le Contrat Dans Son Ensemble

Le contrat est très court, mais il contient toute la logique essentielle du multisig :

- la liste des approvers
- le quorum
- la liste des transferts proposés
- la trace des approvals déjà donnés
- la logique qui exécute le paiement quand le quorum est atteint

## 4. Lecture Du Code Pas À Pas

### 4.1 Déclaration Du Contrat

```solidity
contract Wallet {
```

C'est le contrat principal. Il représente le wallet multisignature.

## 4.2 Variables D'État

```solidity
address[] public approvers;
uint public quorum;
```

### `approvers`

Tableau des adresses autorisées à participer.

Dans ce projet, ces adresses sont fixées au moment du déploiement.

### `quorum`

Nombre minimum d'approbations nécessaires pour exécuter un transfert.

Exemple :

- `3` approvers
- `quorum = 2`
- il faut donc 2 validations pour envoyer les fonds

## 4.3 Structure `Transfer`

```solidity
struct Transfer {
    uint id;
    uint amount;
    address payable to;
    uint approvals;
    bool sent;
}
```

Chaque transfert est représenté par cette structure.

### Rôle de chaque champ

- `id` : identifiant du transfert
- `amount` : montant à envoyer
- `to` : adresse destinataire
- `approvals` : nombre d'approbations déjà obtenues
- `sent` : indique si le transfert a déjà été exécuté

Important :

- un transfert peut être créé sans être exécuté
- il devient exécuté seulement quand `approvals >= quorum`

## 4.4 Stockage Des Transferts Et Des Approvals

```solidity
Transfer[] public transfers;
mapping(address => mapping(uint => bool)) public approvals;
```

### `transfers`

Tableau de tous les transferts proposés.

### `approvals`

Cette structure sert à mémoriser qui a approuvé quel transfert.

Lecture logique :

- clé 1 : l'adresse du votant
- clé 2 : l'id du transfert
- valeur : `true` si cette adresse a déjà approuvé ce transfert

Exemple :

```solidity
approvals[owner2][0] == true
```

Cela veut dire :

- `owner2` a déjà approuvé le transfert d'id `0`

Pourquoi c'est utile :

- cela empêche une même personne d'approuver deux fois le même transfert

## 4.5 Le Constructeur

```solidity
constructor(address[] memory _approvers, uint _quorum) payable {
    approvers = _approvers;
    quorum = _quorum;
}
```

Le constructeur s'exécute une seule fois, au moment du déploiement.

Il initialise :

- la liste des approvers
- le quorum

Le mot-clé `payable` permet aussi d'envoyer de l'ether dès le déploiement.

Dans ton script de déploiement :

- le contrat reçoit `1 ETH` à la création

Donc le wallet est financé dès le début.

## 4.6 Fonction `getApprovers`

```solidity
function getApprovers() external view returns(address[] memory) {
    return approvers;
}
```

Cette fonction retourne la liste des approvers.

Elle est :

- `external` : appelée depuis l'extérieur du contrat
- `view` : elle lit l'état sans le modifier

Le frontend l'utilise pour afficher les signataires.

## 4.7 Fonction `getTransfers`

```solidity
function getTransfers() external view returns(Transfer[] memory) {
    return transfers;
}
```

Cette fonction retourne la liste complète des transferts.

Le frontend s'en sert pour afficher :

- les transferts en attente
- le nombre d'approbations
- l'état envoyé ou non envoyé

## 4.8 Fonction `createTransfer`

```solidity
function createTransfer(uint amount, address payable to) external onlyApprover() {
    transfers.push(Transfer(
        transfers.length,
        amount,
        to,
        0,
        false
    ));
}
```

Cette fonction crée une proposition de transfert.

### Ce qu'elle fait

Elle ajoute dans `transfers` un nouvel objet avec :

- un `id` égal à la taille actuelle du tableau
- le `amount`
- l'adresse `to`
- `0` approval au début
- `sent = false`

### Point important

Créer un transfert ne veut pas dire envoyer l'argent.

Cette fonction ne fait que proposer une opération.
L'exécution réelle se fera plus tard, dans `approveTransfer`, si le quorum est atteint.

### Sécurité

La fonction est protégée par `onlyApprover()`.

Donc :

- seuls les approvers peuvent proposer un transfert

## 4.9 Fonction `approveTransfer`

```solidity
function approveTransfer(uint id) external onlyApprover() {
    require(transfers[id].sent == false, 'transfer has already been sent');
    require(approvals[msg.sender][id] == false, 'cannot approve transfer twice');

    approvals[msg.sender][id] = true;
    transfers[id].approvals++;

    if(transfers[id].approvals >= quorum) {
        transfers[id].sent = true;
        address payable to = transfers[id].to;
        uint amount = transfers[id].amount;
        to.transfer(amount);
    }
}
```

C'est la fonction la plus importante du contrat.

### Étape 1. Vérifier que le transfert n'a pas déjà été envoyé

```solidity
require(transfers[id].sent == false, 'transfer has already been sent');
```

Si `sent == true`, on bloque.

Pourquoi :

- pour éviter d'envoyer deux fois le même transfert

### Étape 2. Vérifier que la même adresse n'approuve pas deux fois

```solidity
require(approvals[msg.sender][id] == false, 'cannot approve transfer twice');
```

Si l'adresse a déjà approuvé ce transfert, la transaction revert.

Pourquoi :

- une signature par approver et par transfert

### Étape 3. Enregistrer l'approbation

```solidity
approvals[msg.sender][id] = true;
transfers[id].approvals++;
```

On mémorise :

- qui a approuvé
- et on incrémente le compteur d'approbations

### Étape 4. Exécuter si le quorum est atteint

```solidity
if(transfers[id].approvals >= quorum) {
    transfers[id].sent = true;
    address payable to = transfers[id].to;
    uint amount = transfers[id].amount;
    to.transfer(amount);
}
```

Si le nombre d'approbations atteint le quorum :

- on marque le transfert comme envoyé
- on récupère le destinataire
- on récupère le montant
- on envoie les fonds

### Détail important sur l'ordre

Le contrat met `sent = true` avant d'envoyer les fonds.

C'est une bonne idée de sécurité :

- l'état est mis à jour avant l'appel externe
- cela limite certains risques de reentrancy

## 4.10 Fonction `receive`

```solidity
receive() external payable {}
```

Cette fonction permet au contrat de recevoir directement de l'ether.

Exemple :

- un compte peut envoyer de l'ETH au contrat
- le wallet peut donc être rechargé même après le déploiement

Sans cette fonction, le contrat ne pourrait pas accepter un simple envoi d'ether sans appel de fonction spécifique.

## 4.11 Le Modifier `onlyApprover`

```solidity
modifier onlyApprover() {
    bool allowed = false;
    for(uint i = 0; i < approvers.length; i++) {
        if(approvers[i] == msg.sender) {
            allowed = true;
        }
    }
    require(allowed == true, 'only approver allowed');
    _;
}
```

Ce modifier contrôle l'accès.

Il vérifie si `msg.sender` fait partie du tableau `approvers`.

Si oui :

- la fonction continue

Sinon :

- la transaction revert avec `only approver allowed`

Il est utilisé par :

- `createTransfer`
- `approveTransfer`

## 5. Workflow Complet Du Contrat

Voici le scénario standard :

1. Le contrat est déployé avec 3 approvers et un quorum de 2.
2. Le contrat reçoit des fonds.
3. Un approver propose un transfert via `createTransfer`.
4. Le transfert est stocké avec `sent = false` et `approvals = 0`.
5. Un premier approver appelle `approveTransfer(id)`.
6. Le compteur passe à 1.
7. Un second approver appelle `approveTransfer(id)`.
8. Le compteur passe à 2.
9. Comme `2 >= quorum`, le contrat envoie les fonds.
10. Le transfert passe à `sent = true`.

## 6. Exemple Très Concret

Imaginons :

- approvers = Alice, Bob, Charlie
- quorum = 2
- le wallet contient 1 ETH

Scénario :

1. Alice crée un transfert de `0.2 ETH` vers David.
2. Le transfert existe, mais il n'est pas encore exécuté.
3. Bob approuve.
4. Le compteur est à 1, donc rien n'est encore envoyé.
5. Charlie approuve.
6. Le compteur est à 2.
7. Le quorum est atteint.
8. Le contrat envoie `0.2 ETH` à David.

## 7. Ce Que Les Tests Vérifient

Les tests dans [`blockchain/test/Wallet.test.ts`](./blockchain/test/Wallet.test.ts) valident les comportements essentiels :

- le déploiement initialise bien les approvers et le quorum
- un approver peut créer un transfert
- un non approver ne peut pas créer un transfert
- une approbation incrémente bien le compteur
- le transfert est exécuté quand le quorum est atteint
- un non approver ne peut pas approuver
- on ne peut pas approuver un transfert déjà envoyé
- on ne peut pas approuver deux fois le même transfert

Donc, les tests couvrent bien la logique principale du multisig.

## 8. Les Bons Points Du Contrat

Voici ce que tu peux valoriser devant un jury :

- la logique est simple et lisible
- la séparation entre proposition et exécution est claire
- la prévention du double vote est présente
- l'exécution ne se fait qu'après atteinte du quorum
- l'accès est restreint aux approvers
- le contrat peut recevoir de l'ether
- les tests unitaires couvrent les cas essentiels

## 9. Les Limites Du Contrat

Cette section est très importante pour un oral. Un bon jury apprécie quand tu sais expliquer non seulement ce qui marche, mais aussi ce qui peut être amélioré.

### 9.1 Pas de vérification forte du constructeur

Le constructeur accepte n'importe quelle liste d'approvers et n'importe quel quorum.

Problèmes possibles :

- quorum à `0`
- quorum plus grand que le nombre d'approvers
- adresses dupliquées
- adresse zéro

Amélioration attendue :

- ajouter des `require` dans le constructeur

### 9.2 Pas d'événements

Le contrat n'émet aucun event.

Conséquence :

- moins pratique pour tracer les actions on-chain
- moins propre pour une vraie intégration frontend ou indexation

Amélioration :

- ajouter `TransferCreated`, `TransferApproved`, `TransferSent`

### 9.3 Vérification des approvers en boucle

Le modifier `onlyApprover` parcourt tout le tableau `approvers`.

Conséquence :

- coût en gas qui augmente avec le nombre d'approvers

Amélioration :

- utiliser un `mapping(address => bool)` pour tester l'autorisation en temps constant

### 9.4 Pas de révocation d'approbation

Une fois qu'un approver a voté, il ne peut pas retirer son vote.

Ce n'est pas forcément un bug, mais c'est une limite fonctionnelle.

### 9.5 Pas de gestion des rôles après déploiement

On ne peut pas :

- ajouter un approver
- retirer un approver
- changer le quorum

Le contrat est donc statique après déploiement.

### 9.6 Usage de `transfer`

Le contrat utilise :

```solidity
to.transfer(amount);
```

Cela fonctionne dans ce projet, mais en production beaucoup de développeurs préfèrent `call`.

Pourquoi :

- `transfer` impose une limite de gas stricte
- certains receveurs complexes peuvent faire échouer l'envoi

Version plus flexible :

```solidity
(bool success, ) = to.call{value: amount}("");
require(success, "transfer failed");
```

### 9.7 Pas de message explicite si l'id n'existe pas

Si `id` est hors limite, l'accès `transfers[id]` revert automatiquement.

Donc le contrat échoue, mais sans message métier très clair.

Amélioration :

```solidity
require(id < transfers.length, "transfer does not exist");
```

### 9.8 Pas de vérification du montant ou du destinataire

Le contrat n'interdit pas :

- un montant à `0`
- une adresse zéro

Ce n'est pas toujours fatal, mais ce n'est pas idéal.

## 10. Pourquoi Ce Contrat Est Quand Même Pertinent Pour Un Projet Académique

Parce qu'il montre très bien les concepts fondamentaux :

- stockage on-chain
- contrôle d'accès
- gestion d'un quorum
- prévention du double vote
- exécution conditionnelle d'un transfert
- interaction avec un frontend
- tests unitaires de logique métier

En bref :

> Ce n'est pas un multisig de production, mais c'est une très bonne base pédagogique.

## 11. Questions Possibles Du Jury Avec Réponses

### Q1. C'est quoi un wallet multisignature ?

Un wallet multisignature est un wallet qui demande plusieurs validations avant d'exécuter une action sensible, ici un transfert d'ether.

### Q2. Quel problème ce contrat résout-il ?

Il évite qu'une seule personne contrôle seule la trésorerie. Les fonds sont protégés par une validation collective.

### Q3. Quelle est la différence entre un wallet normal et ce wallet ?

Un wallet normal dépend d'une seule clé privée. Ici, plusieurs approvers participent, et le transfert ne part que si le quorum est atteint.

### Q4. Que représente le quorum ?

Le quorum est le nombre minimum d'approbations nécessaires pour exécuter un transfert.

### Q5. Pourquoi stocker les transferts dans un tableau ?

Parce qu'on veut conserver l'historique des propositions avec un identifiant simple basé sur l'index.

### Q6. Pourquoi utiliser un `mapping(address => mapping(uint => bool))` ?

Pour mémoriser si une adresse a déjà approuvé un transfert donné, et ainsi empêcher le double vote.

### Q7. Pourquoi `createTransfer` n'envoie pas directement les fonds ?

Parce que le principe d'un multisig est de séparer la proposition du transfert et sa validation collective.

### Q8. À quel moment les fonds sont-ils réellement envoyés ?

Dans `approveTransfer`, au moment où le nombre d'approbations atteint ou dépasse le quorum.

### Q9. Comment le contrat empêche-t-il une double approbation ?

Avec :

```solidity
require(approvals[msg.sender][id] == false, 'cannot approve transfer twice');
```

### Q10. Comment le contrat empêche-t-il une personne externe d'interagir ?

Avec le modifier `onlyApprover`, qui vérifie que `msg.sender` appartient à la liste des approvers.

### Q11. Pourquoi la fonction `receive()` existe-t-elle ?

Pour permettre au contrat de recevoir directement de l'ether, sans appeler une fonction spéciale.

### Q12. Pourquoi le constructeur est-il `payable` ?

Pour permettre de financer le contrat dès sa création.

### Q13. Que se passe-t-il si le wallet n'a pas assez de fonds ?

L'envoi d'ether échouera et la transaction revert. Le transfert ne sera donc pas exécuté.

### Q14. Que se passe-t-il si l'id du transfert est faux ?

L'accès au tableau `transfers[id]` revert automatiquement. Une amélioration serait d'ajouter un `require` explicite.

### Q15. Pourquoi `sent = true` est défini avant l'envoi des fonds ?

Pour mettre l'état à jour avant l'appel externe, ce qui est une pratique plus sûre.

### Q16. Pourquoi ce contrat n'est pas encore un contrat de production ?

Parce qu'il manque des protections et des fonctions avancées :

- pas d'events
- pas de validation stricte du constructeur
- pas de gestion dynamique des approvers
- pas de revoke
- usage de `transfer` au lieu de `call`

### Q17. Pourquoi ne pas utiliser directement un `mapping` pour les approvers ?

Ce serait plus efficace en gas pour vérifier l'autorisation. Ici, le tableau est simple pédagogiquement, mais moins scalable.

### Q18. Quels tests montrent que le contrat marche ?

Les tests montrent :

- que seuls les approvers peuvent agir
- que le compteur d'approbations monte correctement
- que le transfert part quand le quorum est atteint
- qu'une double approbation est interdite

### Q19. Que ferais-tu si tu voulais améliorer le contrat ?

J'ajouterais :

- des `require` dans le constructeur
- des events
- une vérification explicite de l'id
- un mapping pour les approvers
- une fonction de revoke
- une logique admin pour modifier approvers et quorum
- `call` à la place de `transfer`

### Q20. Pourquoi ce projet est pertinent pédagogiquement ?

Parce qu'il relie plusieurs notions fondamentales de la blockchain :

- smart contract
- contrôle d'accès
- gestion des fonds
- quorum
- frontend web3
- tests unitaires

## 12. Questions Un Peu Plus Techniques Que Le Jury Peut Poser

### Q21. Quelle est la complexité de `onlyApprover` ?

Elle est en `O(n)` car on parcourt le tableau des approvers.

### Q22. Pourquoi `approvals` existe à la fois comme compteur dans `Transfer` et comme mapping global ?

Parce qu'ils ont deux rôles différents :

- `transfers[id].approvals` compte le nombre total de votes
- `approvals[address][id]` mémorise qui a déjà voté

### Q23. Pourquoi le transfert est exécuté dans la fonction d'approbation et non dans une fonction séparée ?

Parce que cela simplifie le design :

- une approbation est ajoutée
- si le quorum est atteint, l'exécution se fait immédiatement

Une autre architecture aurait pu séparer `approve` et `execute`.

### Q24. Peut-on approuver un transfert déjà exécuté ?

Non. Le `require(transfers[id].sent == false)` l'interdit.

### Q25. Peut-on créer plusieurs transferts en parallèle ?

Oui. Chaque transfert a son propre `id`, son propre compteur d'approbations et son propre statut `sent`.

### Q26. Pourquoi le contrat n'utilise-t-il pas OpenZeppelin ?

Ce projet vise la simplicité pédagogique. Dans un contexte plus avancé, on pourrait réutiliser des composants standardisés ou s'inspirer de patterns reconnus.

## 13. Mini Pitch Oral En 30 À 45 Secondes

Tu peux dire quelque chose comme :

> Notre projet implémente un wallet multisignature en Solidity. Le contrat stocke une liste d'approvers, un quorum minimal et une liste de transferts proposés. Un approver peut créer une proposition de transfert, mais les fonds ne sont envoyés que lorsque plusieurs approvers valident cette proposition. Le contrat empêche les doubles approbations, limite l'accès aux signataires autorisés, et peut recevoir de l'ether. Ce n'est pas encore un multisig de production, mais il démontre clairement les mécanismes essentiels de gouvernance partagée et de sécurisation d'une trésorerie.

## 14. Ce Qu'il Faut Absolument Retenir

Si tu dois mémoriser seulement l'essentiel, retiens ces 6 points :

1. Le contrat gère un wallet partagé entre plusieurs approvers.
2. Un transfert est d'abord proposé, pas exécuté immédiatement.
3. Chaque approver peut approuver une seule fois par transfert.
4. Quand le nombre d'approbations atteint le quorum, le contrat envoie les fonds.
5. Seuls les approvers peuvent créer et approuver des transferts.
6. Le contrat est pédagogique, fonctionnel, mais perfectible pour un usage production.

## 15. Réponse Courte Si Le Jury Demande "Quelle Est La Logique Centrale ?"

Tu peux répondre :

> La logique centrale est qu'un transfert n'est jamais exécuté par la décision d'une seule personne. Il doit être créé, validé par plusieurs approvers, puis il est exécuté automatiquement quand le quorum est atteint.

## 16. Réponse Courte Si Le Jury Demande "Quelles Sont Les Limites ?"

Tu peux répondre :

> Le contrat fonctionne bien pour démontrer le multisig, mais il manque certaines briques de production comme les events, la validation stricte des paramètres, une gestion dynamique des signataires, la révocation d'approbation et une stratégie d'envoi plus robuste que `transfer`.
