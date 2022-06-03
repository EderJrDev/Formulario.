/* Obrigado por abrir meu projeto ! 
    o intuido da pagina foi realizar um cadastro com 3 informações 
    básicas, nome, email e telefone. 
*/

const openModal = () => document.getElementById(`modal`) // aqui ele abre a "tela" para cadastro
    .classList.add(`active`)

const closeModal = () => {
    clearFields() 
    document.getElementById(`modal`).classList.remove(`active`) //aqui ele fecha a "tela" para cadastro
}
const getLocalStorage = () => JSON.parse(localStorage.getItem(`db_client`)) ?? [] // com o ?? ele verifica se está vazio , JSON.parse está transformando em estring
const setlocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient))
// Metodo CRUD - Create read update delete

// CRUD - DELETE
const deleteClient = (index) => {
    const dbClient = readClient()
    dbClient.splice(index, 1)
    setlocalStorage(dbClient )
} 
// CRUD - READ 
const readClient = () => getLocalStorage() // é uma funcção que vai receber 
// CRUD - CREAD  
const createClient = (client) => {  // essa função vai receber um cliente
    const dbClient = getLocalStorage() // foi usado um LocalStorage para o armazenamento dos dados
    dbClient.push (client ) // com o push ele acrescenta mais um 
    setlocalStorage(dbClient) // o db_client é a key 

}
const isValidFields = () => {
    return document.getElementById(`form`).reportValidity() // essa função retorna se todos os valores do html foram requisitados
}
// interação com o layout
const clearFields = () => {
    const fields = document.querySelectorAll(' .modal-field') // ele vai trazer um array com  todos os valores que ele encontrar
    fields.forEach(field => field.value = " ") 
}  
const salveClient = () => { 
    if (isValidFields()){
        const client = {
            nome: document.getElementById(`nome`).value,
            email: document.getElementById(`email`).value,
            celular: document.getElementById(`telefone`).value,
        }
        createClient(client)
        updateTable() 
        closeModal()
    }
}
const createRow = (client, index) =>  { // o index é o indice de cada elemento 
    const newRow = document.createElement(`tr`)
    newRow.innerHTML = `
        <td> ${client.nome}</td>
        <td> ${client.email}</td>
        <td> ${client.celular}</td>
        <td>
            <button type= "button" class = "button red" id="delete-${index}"> Excluir </button>   
        </td>`
    document.querySelector(`#tableClient>tbody`).appendChild(newRow)
}
const clearTable = () => {
    const rows = document. querySelectorAll(`#tableClient>tbody tr`)
    rows.forEach(row => row.parentNode.removeChild(row))
}
const updateTable = () => { 
    const dbClient = readClient() // aqui ele vai ver os clientes
    clearTable()
    dbClient.forEach(createRow) // aqui ele vai ler os dados e criar as linhas com cada cliente 
} 
const deleteCliente = (event) => {
    if(event.target.type == `button`){
        const [action, index] = event.target.id.split('-')
        if(action == `delete`){
             const client = readClient()[index]
             client.index = index
            const response = confirm(`Deseja realmente excluir o cliente ${client.nome} ? `)
            if(response){
                deleteClient(index)
                updateTable()
            }  
        }
    }
}
updateTable()
// Eventos 
document.getElementById(`cadastrarCliente`).addEventListener(`click`, openModal)

document.getElementById(`modalClose`).addEventListener(`click`, closeModal)

document.getElementById(`salvar`).addEventListener(`click`, salveClient)

document.querySelector(`#tableClient>tbody`).addEventListener(`click`, deleteCliente)