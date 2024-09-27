const item = document.getElementById("input-item");
const botaoSalvarItem = document.getElementById("adicionar-item");
const listaDeCompras = document.getElementById("lista-de-compras");
const listaComprados = document.getElementById("lista-comprados");
const mensagemVazia = document.getElementById("mensagem-vazia");
let contador = 0;

// Função para verificar se a lista de compras está vazia
function verificarListaVazia() {
    if (listaDeCompras.children.length === 0) {
        mensagemVazia.style.display = 'block';
    } else {
        mensagemVazia.style.display = 'none';
    }
}

// Verifica a lista ao carregar a página
verificarListaVazia();

botaoSalvarItem.addEventListener('click', adicionarItem);

function adicionarItem(evento) {
    evento.preventDefault(); // Evitar refresh na página quando clicar no botão

    const itemDaLista = document.createElement("li");
    const containerItemLista = document.createElement("div");
    containerItemLista.classList.add("lista-item-container");

    const containerNomeDoItem = document.createElement("div");
    containerNomeDoItem.classList.add("nome-item");

    const containerCheckbox = document.createElement("div");
    containerCheckbox.classList.add("container-checkbox");

    const checkboxInput = document.createElement("input");
    checkboxInput.type = "checkbox";
    checkboxInput.classList.add("input-checkbox");
    checkboxInput.id = "checkbox-" + contador++;

    const checkboxLabel = document.createElement("label");
    checkboxLabel.setAttribute("for", checkboxInput.id);

    const checkboxCustomizado = document.createElement("div");
    checkboxCustomizado.classList.add("checkbox-customizado");

    checkboxLabel.appendChild(checkboxInput);
    checkboxLabel.appendChild(checkboxCustomizado);

    containerCheckbox.appendChild(checkboxLabel);
    containerNomeDoItem.appendChild(containerCheckbox);

    const nomeDoItem = document.createElement("p");
    nomeDoItem.innerText = item.value;
    containerNomeDoItem.appendChild(nomeDoItem);

    const containerBotoes = document.createElement("div");
    const botaoRemover = document.createElement("button");
    botaoRemover.classList.add("item-lista-button");

    const imagemRemover = document.createElement("img");
    imagemRemover.src = "img/delete.svg";
    imagemRemover.alt = "Remover";

    botaoRemover.appendChild(imagemRemover);
    containerBotoes.appendChild(botaoRemover);

    const botaoEditar = document.createElement("button");
    botaoEditar.classList.add("item-lista-button");

    const imagemEditar = document.createElement("img");
    imagemEditar.src = "img/edit.svg";
    imagemEditar.alt = "Editar";

    botaoEditar.appendChild(imagemEditar);
    containerBotoes.appendChild(botaoEditar);

    // Adicionando data e hora
    const itemData = document.createElement("p");
    itemData.innerText = `${new Date().toLocaleDateString("pt-BR", { weekday: "long" })} ${new Date().toLocaleDateString("pt-BR")} ${new Date().toLocaleTimeString("pt-BR", { hour: "numeric", minute: "numeric" })}`;
    itemData.classList.add("texto-data");

    containerItemLista.appendChild(containerNomeDoItem);
    containerItemLista.appendChild(containerBotoes);
    itemDaLista.appendChild(containerItemLista);
    itemDaLista.appendChild(itemData);
    listaDeCompras.appendChild(itemDaLista);

    // Verifica se a lista de compras está vazia
    verificarListaVazia();

    // Função para marcar como comprado
    checkboxLabel.addEventListener('click', function (evento) {
        const checkboxInput = evento.currentTarget.querySelector('.input-checkbox');
        const checkboxCustomizado = evento.currentTarget.querySelector('.checkbox-customizado');
        const itemTitulo = evento.currentTarget.closest('li').querySelector('.nome-item p');

        if (checkboxInput.checked) {
            checkboxCustomizado.classList.add('checked');
            itemTitulo.style.textDecoration = 'line-through';

            // Mover item para a lista de comprados
            listaComprados.appendChild(itemDaLista);
        } else {
            checkboxCustomizado.classList.remove('checked');
            itemTitulo.style.textDecoration = 'none';

            // Mover item de volta para a lista de compras
            listaDeCompras.appendChild(itemDaLista);
        }

        verificarListaVazia();
    });

    // Função para editar o item
    botaoEditar.addEventListener('click', function () {
        const novoNome = prompt('Editar item:', nomeDoItem.innerText);
        if (novoNome !== null && novoNome.trim() !== '') {
            nomeDoItem.innerText = novoNome;
        }
    });

    // Função para remover o item
    botaoRemover.addEventListener('click', function () {
        itemDaLista.remove();
        verificarListaVazia();
    });

    // Limpar o campo de input após adicionar
    item.value = '';
}
