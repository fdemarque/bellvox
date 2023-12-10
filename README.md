**Bellvox**

**Descrição:**
O projeto "bellvox" é uma API desenvolvida para a plataforma de streaming de músicas fictícia Bellvox. Esta API fornece endpoints para autenticação de usuários, cadastro de novos usuários, busca e manipulação de informações relacionadas à música.

**Recursos Principais:**

1. **Autenticação de Usuários:**
   - **Endpoint:** `/login`
   - **Método:** `POST`
   - **Descrição:** Este endpoint permite que os usuários façam login na plataforma. Os usuários devem fornecer um nome de usuário (`User`) e uma senha (`Password`). O sistema verifica as credenciais no banco de dados e retorna um token JWT válido se as credenciais forem corretas.

2. **Cadastro de Usuários:**
   - **Endpoint:** `/signup`
   - **Método:** `POST`
   - **Descrição:** Usuários podem se cadastrar na plataforma fornecendo um nome de usuário (`User`), uma senha (`Password`), e um nome de usuário real (`Name`). O sistema verifica se o usuário já existe no banco de dados antes de realizar o cadastro.

3. **Busca de Músicas:**
   - **Endpoint:** `/search/:id/:name/:artist`
   - **Método:** `GET`
   - **Descrição:** Este endpoint permite a busca de músicas com base em diferentes critérios, como ID, nome e artista. Os parâmetros são opcionais, e a API retorna uma lista de músicas correspondentes.

4. **Atualização de Informações de Música:**
   - **Endpoint:** `/update`
   - **Método:** `POST`
   - **Descrição:** Usuários autenticados podem utilizar este endpoint para atualizar informações de uma música. O corpo da requisição deve incluir o nome da música (`name`), o nome do artista (`artist`), a coluna que deseja atualizar (`colunaAtualizar`), e o novo valor (`novoValor`) para essa coluna.

5. **Exclusão de Música:**
   - **Endpoint:** `/delete/:id/:name`
   - **Método:** `DELETE`
   - **Descrição:** Usuários autenticados podem excluir uma música com base no ID e no nome fornecidos na URL.

**Dependências:**
- Express.js: Framework para construção de aplicativos web.
- Knex.js: Construtor de consultas SQL para Node.js.
- JWT: Biblioteca para geração e verificação de tokens JWT.
- Crypto: Biblioteca para operações de criptografia, como a conversão de senhas para MD5.

**Configuração:**
1. Instale as dependências: `npm install`.
2. Configure o banco de dados no arquivo `knexfile.js`.
3. Execute as migrações do banco de dados: `knex migrate:latest`.
4. Inicie o servidor: `npm start`.

**Contextualização:**
- Este projeto foi desenvolvido como requisito avaliativo parcial para a disciplina de desenvolvimento web backend I, referente à graduação em Análise e Desenvolvimento de Sistemas.

**Licença:**
- Este projeto é distribuído sob a licença MIT. Consulte o arquivo `LICENSE` para mais detalhes.
