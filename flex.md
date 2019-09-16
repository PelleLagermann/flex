# Concept
IFTTT service for registrering when a person arrives at and leaves a specific location. 
The idea is to create a simple replacement for the soon to be discontinued Flex system.

### Why IFTTT
Easy way of getting location data from phone

# Components
The project will consist of the following parts:
* An IFTTT service
* Storage for the location data (Firebase, Google Docs, Dropbox...)
* A web-app for viewing and editing data

# Tech stack
### Version control
Git / Github

### Storage
Firebase?

### Webapp
VueJs

### Hosting of webapp
Netlify?

# IFTTT SERVICE
Send event on entering and leaving specified area

# WEB APP
* Sprog (DA, EN)
* Menu slider op over hele skærmen og ikon skifter til luk
* Header
    * Reg total / uge-norm
    * Ugenr m. link til oversigt

# PAGES
## Login
- Opret Bruger
    - vælg sprog
- Login
- Reset / send password 

### Opret konto-flow
* Hvor mange timer arbejder du om ugen
* Auto pause
* Start of week


## Tidsreg / Home
* Timekonto
* Dagskarrusel m. optælling af reg. timer per dag
* Før registrering
    * Fra-tid viser aktuel tid "live"
* Efter registrering
    * Til-tid viser aktuel tid "live"
    * Stop-knap viser periode siden start
* Hvis auto-pause er der automatisk linje med pause
    * Linker til redigeringsside hvor man kan ændre perioden eller fjerne pausen
* Notifikationer ved manglende registreringer - lister datoer med link / måske med direkte link til registrering af fuld dag.

### Manuel registrering
* Udfyld fuld dag
* Reg fra/til tid
* Registrer Reggie

### Ret tidsregistrering
* Ret og slet tidsreg

## Settings
* Hvor mange timer arbejder du om ugen
* Auto pause
* Start of week
* sprog

## Mine oplysninger
* email
* password

## Min Timekonto
* Antal timer på kontoer
* X Reggier

## Oversigt
* Kalendervisning-ish
    * Række per uge (Ugenr, M, T, O, T, F, L, S, TOTAL)
        * Farvekoder på dage for plus i timer, minus i timer og markering af ikke udfyldte dage


# SKIVE 2
 - Feriedage som udbygning til fravær