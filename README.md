# FindAFriend API

Esta API gerencia criação de ORGs, cadastro de pets e pesquisa destes em ORGs próximas.

### Regras da aplicação

- [x] Deve ser possível se cadastrar como uma ORG
- [x] Deve ser possível realizar login como uma ORG
- [x] Deve ser possível listar as ORGs próximas
- [x] Deve ser possível cadastrar um pet
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [x] Deve ser possível filtrar pets por suas características
- [x] Deve ser possível visualizar detalhes de um pet para adoção

### Regras de negócio

- [x] Uma ORG precisa ter um endereço e um número de WhatsApp
- [x] Ao listar as ORGs próximas, podemos escolher um raio de distância
- [x] Um pet deve estar ligado a uma ORG
- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x] Todos os filtros, além da cidade, são opcionais
- [x] O usuário que quer adotar entrará em contato com a ORG via WhatsApp
- [x] Para uma ORG acessar a aplicação como admin, ela precisa estar logada
