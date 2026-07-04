export function initChat() {
    const chatModal = document.getElementById('chat-modal');
    document.getElementById('btn-chat-start').addEventListener('click', () => {
        chatModal.style.display = 'flex';
    });

    document.getElementById('send-msg').addEventListener('click', () => {
        const msg = document.getElementById('chat-input').value;
        if(msg) alert("Message Sent: " + msg);
    });
}