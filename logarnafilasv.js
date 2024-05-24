// ==UserScript==
// @name         LOGAR e DESLOGAR DA FILA - SZ.CHAT
// @version      2.0
// @description  Automação para logar na Fila
// @author       Matheus Eger
// @match        http://qm.coger.net.br:8080/queuemetrics/qm_agentpage2_load.do
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gegnet.com.br
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let extensaoValue = '111111'; // Inserir o ramal (Ex: 111111)
    let horaDeslogar = 'HH:mm'; // Hora para deslogar, no formato HH:mm

    // Função para definir a extensão (ramal)
    function definirExtensao(extensao) {
        extensaoValue = extensao;
    }

    // Função para definir a hora de deslogar
    function definirHoraDeslogar(hora) {
        horaDeslogar = hora;
    }

    // Função para obter a hora atual no formato HH:mm
    function getHoraAtual() {
        const dataAtual = new Date();
        const hora = dataAtual.getHours().toString().padStart(2, '0');
        const minutos = dataAtual.getMinutes().toString().padStart(2, '0');
        return hora + ':' + minutos;
    }

    function logar() {
        console.log('Logar button clicked');

        // 1. Selecionar o campo de texto para a extensão atual
        const extensaoInput = document.querySelector('input.gwt-TextBox.GMTE43CCNS');
        if (extensaoInput) {
            console.log('Campo de extensão atual encontrado');
            // 2. Limpar o campo antes de inserir o código da variável global
            extensaoInput.value = ''; // Limpa o campo
            extensaoInput.value = extensaoValue; // Insere o valor da variável global
        } else {
            console.log('Campo de extensão atual não encontrado');
            return; // Se o campo não for encontrado, não podemos prosseguir
        }

        // 3. Simular o clique no botão "Conectar em todas as filas"
        const conectarButton = document.querySelector('button.GMTE43CCAE[title="Conectar em todas as filas"]');
        if (conectarButton) {
            console.log('Botão "Conectar em todas as filas" encontrado');
            conectarButton.click();
        } else {
            console.log('Botão "Conectar em todas as filas" não encontrado');
            return; // Se o botão não for encontrado, não podemos prosseguir
        }

        // 4. Verificar periodicamente se o botão "Pausa" está disponível
        const verificarBotaoPausa = setInterval(() => {
            const pausaButton = document.querySelector('button.GMTE43CCIG:not([disabled])');
            if (pausaButton) {
                console.log('Botão "Pausa" encontrado');
                clearInterval(verificarBotaoPausa); // Para de verificar quando o botão é encontrado
                pausaButton.click();

                // Aguardar um breve intervalo para a pausa ser aplicada
                setTimeout(() => {
                    // Mudar o motivo da pausa para SZ.CHAT
                    const selectElement = document.querySelector('select.GMTE43CCNG');
                    if (selectElement) {
                        console.log('Elemento <select> encontrado');
                        // Define o valor para SZ.CHAT
                        selectElement.value = '20';
                        // Dispara o evento de mudança
                        const event = new Event('change', { bubbles: true });
                        selectElement.dispatchEvent(event);
                    } else {
                        console.log('Elemento <select> não encontrado');
                    }

                    // Aguardar um breve intervalo para o botão "Corrigir" aparecer
                    setTimeout(() => {
                        const corrigirButton = document.querySelector('button.GMTE43CCIG');
                        if (corrigirButton && corrigirButton.textContent === 'Corrigir') {
                            console.log('Botão "Corrigir" encontrado');
                            corrigirButton.click(); // Clicar no botão "Corrigir"
                        } else {
                            console.log('Botão "Corrigir" não encontrado após a pausa');
                        }
                    }, 2000); // Aguarda 2 segundos para verificar se o botão "Corrigir" aparece
                }, 5000); // Aguarda 5 segundos para a pausa ser aplicada
            } else {
                console.log('Aguardando botão "Pausa"...');
            }
        }, 500); // Verifica a cada 500 milissegundos
    }

    // Função para agendar a deslogar para a hora definida
    function agendarDeslogar() {
        // Obtém a hora atual
        const horaAtual = getHoraAtual();

        // Verifica se a hora atual é igual à hora de deslogar
        if (horaAtual === horaDeslogar) {
            // Desloga automaticamente
            deslogar();
        } else {
            // Calcula o tempo em milissegundos até a próxima verificação (a cada minuto)
            const tempoAteProximaVerificacao = 60000; // 1 minuto em milissegundos

            // Calcula o tempo em milissegundos até a próxima hora de deslogar
            const horaDeslogarSplit = horaDeslogar.split(':');
            const horaDeslogarEmMilissegundos = new Date().setHours(parseInt(horaDeslogarSplit[0]), parseInt(horaDeslogarSplit[1]), 0, 0);
            const tempoAteDeslogar = horaDeslogarEmMilissegundos - new Date().getTime();

            // Agenda a próxima verificação
            setTimeout(agendarDeslogar, Math.min(tempoAteProximaVerificacao, tempoAteDeslogar));
        }
    }

    function deslogar() {
        console.log('Deslogar button clicked');

        // Clicar no botão "Desconectar de todas as filas"
        const desconectarButton = document.querySelector('button.GMTE43CCAE[title="Desconectar de todas as filas"]');
        if (desconectarButton) {
            console.log('Botão "Desconectar de todas as filas" encontrado');
            desconectarButton.click();
        } else {
            console.log('Botão "Desconectar de todas as filas" não encontrado');
        }
        console.log('Hora atual:', getHoraAtual());
    }

    function ligar() {
        console.log('Ligar button clicked');

        // 1. Simular o clique no botão "NOC-GGNET"
        const nocButton = document.querySelector('div[__idx="1"]');

        // Verifica se o botão foi encontrado
        if (nocButton) {
            console.log('Botão NOC-GGNET encontrado');
            nocButton.click();
        } else {
            console.log('Botão NOC-GGNET não encontrado');
            return; // Se o botão não for encontrado, não podemos prosseguir
        }

        // 2. Mudar a fila
        const changeQueueButton = document.querySelector('button.GMTE43CCAE[title="Desconectar das filas selecionadas"]');
        if (changeQueueButton) {
            console.log('Mudança de fila acionada');
            changeQueueButton.click(); // Simula um clique no botão de mudança de fila

            // 3. Clicar em "Fim da Pausa"
            const endPauseButton = document.querySelector('button.GMTE43CCIG:not([disabled]):not([title="Pausa"])');
            if (endPauseButton) {
                console.log('Botão de fim da pausa encontrado');
                endPauseButton.click(); // Simula um clique no botão de fim da pausa
            } else {
                console.log('Botão de fim da pausa não encontrado');
            }
        } else {
            console.log('Botão de mudança de fila não encontrado');
        }
    }

    function szChat() {
        console.log('SZ.CHAT button clicked');

        // 1. Selecionar o botão para mudar para a fila anterior
        const backToQueueButton = document.querySelector('button.GMTE43CCAE[title="Conectar em todas as filas"]');
        if (backToQueueButton) {
            console.log('Botão para mudar para a fila anterior encontrado');
            backToQueueButton.click(); // Simula um clique no botão para mudar para a fila anterior
        } else {
            console.log('Botão para mudar para a fila anterior não encontrado');
            return;
        }

        // 2. Verificar periodicamente se o botão "Pausa" está disponível
        const verificarBotaoPausa = setInterval(() => {
            const pausaButton = document.querySelector('button.GMTE43CCIG:not([disabled])');
            if (pausaButton) {
                console.log('Botão "Pausa" encontrado');
                clearInterval(verificarBotaoPausa); // Para de verificar quando o botão é encontrado
                pausaButton.click();

                // Aguardar um breve intervalo para a pausa ser aplicada
                setTimeout(() => {
                    // Mudar o motivo da pausa para SZ.CHAT
                    const selectElement = document.querySelector('select.GMTE43CCNG');
                    if (selectElement) {
                        console.log('Elemento <select> encontrado');
                        // Define o valor para SZ.CHAT
                        selectElement.value = '20';
                        // Dispara o evento de mudança
                        const event = new Event('change', { bubbles: true });
                        selectElement.dispatchEvent(event);
                    } else {
                        console.log('Elemento <select> não encontrado');
                    }

                    // Aguardar um breve intervalo para o botão "Corrigir" aparecer
                    setTimeout(() => {
                        const corrigirButton = document.querySelector('button.GMTE43CCIG');
                        if (corrigirButton && corrigirButton.textContent === 'Corrigir') {
                            console.log('Botão "Corrigir" encontrado');
                            corrigirButton.click(); // Clicar no botão "Corrigir"
                        } else {
                            console.log('Botão "Corrigir" não encontrado após a pausa');
                        }
                    }, 2000); // Aguarda 2 segundos para verificar se o botão "Corrigir" aparece
                }, 5000); // Aguarda 8 segundos para a pausa ser aplicada
            } else {
                console.log('Aguardando botão "Pausa"...');
            }
        }, 500); // Verifica a cada 500 milissegundos
    }

    function addButtons() {
        // Verifica se os botões já foram adicionados
        if (document.getElementById('logar-button') || document.getElementById('ligar-button') || document.getElementById('deslogar-button') || document.getElementById('sz-chat-button')) {
            return;
        }

        // Função para criar um botão
        function createButton(id, text, onClickFunction) {
            const button = document.createElement('button');
            button.id = id;
            button.innerText = text;
            button.style.width = '90%';
            button.style.marginTop = '10px';
            // Adiciona espaço acima do botão
            button.addEventListener('click', onClickFunction);
            return button;
        }

        // Cria os botões
        const logarButton = createButton('logar-button', 'Logar', logar);
        const ligarButton = createButton('ligar-button', 'Ligar', ligar);
        const deslogarButton = createButton('deslogar-button', 'Deslogar', deslogar);
        const szChatButton = createButton('sz-chat-button', 'SZ.CHAT', szChat);

        // Seleciona o elemento <select> onde os botões serão adicionados
        const selectElement = document.querySelector('.gwt-ListBox');
        if (selectElement) {
            // Adiciona o botão "Logar"
            selectElement.parentNode.insertBefore(logarButton, selectElement.nextSibling);

            // Adiciona o botão "Deslogar" após o botão "Logar"
            logarButton.parentNode.insertBefore(deslogarButton, logarButton.nextSibling);

            // Adiciona o botão "Ligar" após o botão "Deslogar"
            deslogarButton.parentNode.insertBefore(ligarButton, deslogarButton.nextSibling);

            // Adiciona o botão "SZ.CHAT" após o botão "Ligar"
            ligarButton.parentNode.insertBefore(szChatButton, ligarButton.nextSibling);

            console.log('Botões adicionados com sucesso');

        } else {
            console.log('Elemento <select> não encontrado');
        }
    }

    // Função para observar mudanças no DOM
    function observeDOM() {
        const targetNode = document.body;
        const config = { childList: true, subtree: true };

        const callback = function(mutationsList, observer) {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    addButtons();
                }
            }
        };

        const observer = new MutationObserver(callback);
        observer.observe(targetNode, config);

        // Adiciona os botões imediatamente ao carregar a página
        addButtons();
         // Inicia o agendamento da deslogar
        agendarDeslogar();

    }

    // Espera o DOM estar completamente carregado antes de iniciar a observação
    window.addEventListener('load', function() {
        observeDOM();
    });

    // Testando as novas funções
    window.definirExtensao = definirExtensao;
    window.definirHoraDeslogar = definirHoraDeslogar;

})();
