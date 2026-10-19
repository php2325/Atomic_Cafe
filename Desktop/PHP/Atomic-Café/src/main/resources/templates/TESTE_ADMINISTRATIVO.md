# 📋 Guia de Teste - Página Administrativa

## 🎯 Objetivo
Testar a nova página de administração de pedidos (Administrativo) exclusiva para gerentes.

---

## 📝 Configuração Inicial

### 1. Criar um Usuário Gerente
1. Acesse **Register.html**
2. Preencha os dados:
   - **Nome:** Gerente Teste
   - **Email:** gerente@test.com
   - **Senha:** senha123
   - **Tipo de Usuário:** Funcionário
   - Após registrar, abra o console e execute:
   ```javascript
   let users = JSON.parse(localStorage.getItem('atomicCafeUsers'));
   users[users.length - 1].department = 'gerencia';
   localStorage.setItem('atomicCafeUsers', JSON.stringify(users));
   ```

### 2. Criar Alguns Pedidos (clientes normais)
1. Faça login como um cliente
2. Acesse **Pedidos.html**
3. Adicione alguns itens ao carrinho e crie pedidos

---

## ✅ Casos de Teste

### Teste 1: Acesso Negado para Não-Gerentes
- **Step 1:** Faça login como um cliente normal
- **Step 2:** Tente acessar diretamente `administrative.html`
- **Resultado Esperado:** Mensagem de acesso negado e redirecionamento para index.html

### Teste 2: Acesso Permitido para Gerentes
- **Step 1:** Faça login como gerente
- **Step 2:** Clique no ícone de perfil (canto superior direito)
- **Resultado Esperado:** Link "Administrativo" aparece no dropdown
- **Step 3:** Clique no link "Administrativo"
- **Resultado Esperado:** Página administrativa carrega corretamente

### Teste 3: Visualizar Pedidos por Status
- **Step 1:** Na página administrativa, verifique as abas
- **Resultado Esperado:**
  - Aba "Em Atendimento" mostra pedidos com status `attending`
  - Aba "Finalizados" mostra pedidos com status `completed`
  - Badges mostram contagem correta

### Teste 4: Buscar Pedidos
- **Step 1:** No campo de busca, digite o nome de um cliente
- **Resultado Esperado:** Lista filtra em tempo real apenas pedidos do cliente
- **Step 2:** Digite um número de telefone
- **Resultado Esperado:** Filtra por telefone
- **Step 3:** Digite um ID de pedido
- **Resultado Esperado:** Filtra por ID

### Teste 5: Ordenação de Pedidos
- **Step 1:** Mude o select "Ordenar por" para "Mais recentes"
- **Resultado Esperado:** Pedidos ordenados do ID maior para menor
- **Step 2:** Selecione "Mais antigos"
- **Resultado Esperado:** Pedidos ordenados do ID menor para maior
- **Step 3:** Selecione "Valor mais alto"
- **Resultado Esperado:** Pedidos ordenados por total decrescente
- **Step 4:** Selecione "Valor mais baixo"
- **Resultado Esperado:** Pedidos ordenados por total crescente

### Teste 6: Visualizar Detalhes do Pedido
- **Step 1:** Clique no botão "Ver Detalhes" de um pedido
- **Resultado Esperado:**
  - Modal abre com informações completas do cliente
  - Lista completa de itens do pedido
  - Resumo financeiro (subtotal, entrega, total)
  - Status atual exibido

### Teste 7: Atualizar Status do Pedido
- **Step 1:** Clique em "Ver Detalhes" de um pedido "Em Atendimento"
- **Step 2:** Mude o select de status para "Finalizado"
- **Step 3:** Clique em "Atualizar Status"
- **Resultado Esperado:**
  - Modal fecha
  - Pedido aparece na aba "Finalizados"
  - Aba "Em Atendimento" atualiza a contagem

### Teste 8: Atualizar Rápido (Botão na Card)
- **Step 1:** Clique no botão "Finalizar" na card de um pedido "Em Atendimento"
- **Resultado Esperado:**
  - Pedido move para "Finalizados"
  - Texto do botão muda para "Em Atendimento"

### Teste 9: Imprimir Pedido
- **Step 1:** Abra detalhes de um pedido
- **Step 2:** Clique em "Imprimir"
- **Resultado Esperado:**
  - Janela de impressão abre com formatação do pedido
  - Inclui: ID, cliente, items, subtotal, entrega, total

### Teste 10: Deletar Pedido
- **Step 1:** Abra detalhes de um pedido
- **Step 2:** Clique em "Deletar Pedido"
- **Step 3:** Confirme a exclusão
- **Resultado Esperado:**
  - Modal fecha
  - Pedido desaparece das listas
  - Contagem de badges atualiza

### Teste 11: Persistência de Dados
- **Step 1:** Faça alterações na página (mude status, delete pedidos)
- **Step 2:** Atualize a página (F5)
- **Resultado Esperado:** Todas as alterações são mantidas (salvas em localStorage)

---

## 🐛 Problemas Conhecidos e Soluções

### Problema: "Nenhum pedido em atendimento"
- **Causa:** Não há pedidos com status "attending"
- **Solução:** Crie mais pedidos como cliente

### Problema: Link "Administrativo" não aparece
- **Causa:** Usuário não tem `department = 'gerencia'`
- **Solução:** Verifique se executou os comandos de configuração do gerente

### Problema: Modal não abre
- **Causa:** ID do modal incorreto no HTML
- **Solução:** Verifique se `id="orderDetailModal"` está presente no administrative.html

---

## 💾 Dados de Teste Rápido

### Usuário Cliente para Testes
```javascript
// No console do Login.html
localStorage.setItem('atomicCafeUsers', JSON.stringify([
    {
        id: 1,
        name: 'Cliente Teste',
        email: 'cliente@test.com',
        password: 'senha123',
        userType: 'cliente'
    }
]));
```

### Usuário Gerente para Testes
```javascript
// No console do Register.html (após criar)
let users = JSON.parse(localStorage.getItem('atomicCafeUsers'));
users.push({
    id: 999,
    name: 'Gerente Teste',
    email: 'gerente@test.com',
    password: 'senha123',
    userType: 'funcionario',
    department: 'gerencia'
});
localStorage.setItem('atomicCafeUsers', JSON.stringify(users));
```

### Pedidos de Teste
```javascript
localStorage.setItem('atomicCafePedidos', JSON.stringify([
    {
        id: 1,
        cliente: 'João Silva',
        telefone: '11999999999',
        endereco: 'Rua A, 123 - São Paulo, SP',
        itens: [
            { name: 'Café Espresso', price: 4.50 },
            { name: 'Pão de Queijo', price: 3.50 }
        ],
        status: 'attending'
    },
    {
        id: 2,
        cliente: 'Maria Santos',
        telefone: '11888888888',
        endereco: 'Av. B, 456 - São Paulo, SP',
        itens: [
            { name: 'Cappuccino', price: 6.00 },
            { name: 'Bolo de Chocolate', price: 7.50 }
        ],
        status: 'completed'
    }
]));
```

---

## 📊 Checklist Final

- [ ] Usuário gerente criado corretamente
- [ ] Link "Administrativo" aparece no dropdown para gerentes
- [ ] Clientes não conseguem acessar administrative.html
- [ ] Abas funcionam (Em Atendimento/Finalizados)
- [ ] Busca filtra pedidos em tempo real
- [ ] Ordenação funciona em todas as opções
- [ ] Modal de detalhes abre e fecha corretamente
- [ ] Status pode ser atualizado
- [ ] Botão "Finalizar" rápido funciona
- [ ] Impressão funciona
- [ ] Deletar pedidos funciona
- [ ] Dados persistem após atualizar página

---

## 🎉 Sucesso!
Se todos os testes passarem, a página administrativa está funcionando corretamente!
