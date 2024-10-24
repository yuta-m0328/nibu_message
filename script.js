document.addEventListener('DOMContentLoaded', function() {
    const messageList = document.getElementById('message-list');
    const finalOverlay = document.getElementById('final-overlay');
    let messageCount = 0;
    const totalMessages = 40; // Total number of messages
    const messagesPerLoad = 10; // Number of messages per load

    // Sample messages (In a real case, you might load these dynamically)
    const messages = [
        { text: '丹生ちゃん卒業おめでとう！これからも大好きです！', recipient: 'From: 田中' },
        { text: '素晴らしい未来が待っています！', recipient: 'From: 山田' },
        { text: '新しい旅立ちを祝福します！', recipient: 'From: 鈴木' },
        { text: 'これからも元気で頑張ってね！', recipient: 'From: 佐藤' },
        { text: 'たくさんの思い出をありがとう！', recipient: 'From: 伊藤' },
        { text: 'あなたの努力はみんなの誇りです！', recipient: 'From: 中村' },
        { text: '新しい世界へ向かって飛び立とう！', recipient: 'From: 渡辺' },
        { text: '未来が明るく輝きますように！', recipient: 'From: 加藤' },
        { text: '笑顔でこれからも進んでください！', recipient: 'From: 小林' },
        { text: '卒業は新たな始まりです！', recipient: 'From: 松本' },
        { text: '丹生ちゃん卒業おめでとう！これからも大好きです！', recipient: 'From: 田中' },
        { text: '素晴らしい未来が待っています！', recipient: 'From: 山田' },
        { text: '新しい旅立ちを祝福します！', recipient: 'From: 鈴木' },
        { text: 'これからも元気で頑張ってね！', recipient: 'From: 佐藤' },
        { text: 'たくさんの思い出をありがとう！', recipient: 'From: 伊藤' },
        { text: 'あなたの努力はみんなの誇りです！', recipient: 'From: 中村' },
        { text: '新しい世界へ向かって飛び立とう！', recipient: 'From: 渡辺' },
        { text: '未来が明るく輝きますように！', recipient: 'From: 加藤' },
        { text: '笑顔でこれからも進んでください！', recipient: 'From: 小林' },
        { text: '卒業は新たな始まりです！', recipient: 'From: 松本' },
        { text: '丹生ちゃん卒業おめでとう！これからも大好きです！', recipient: 'From: 田中' },
        { text: '素晴らしい未来が待っています！', recipient: 'From: 山田' },
        { text: '新しい旅立ちを祝福します！', recipient: 'From: 鈴木' },
        { text: 'これからも元気で頑張ってね！', recipient: 'From: 佐藤' },
        { text: 'たくさんの思い出をありがとう！', recipient: 'From: 伊藤' },
        { text: 'あなたの努力はみんなの誇りです！', recipient: 'From: 中村' },
        { text: '新しい世界へ向かって飛び立とう！', recipient: 'From: 渡辺' },
        { text: '未来が明るく輝きますように！', recipient: 'From: 加藤' },
        { text: '笑顔でこれからも進んでください！', recipient: 'From: 小林' },
        { text: '卒業は新たな始まりです！', recipient: 'From: 松本' },
        { text: '丹生ちゃん卒業おめでとう！これからも大好きです！', recipient: 'From: 田中' },
        { text: '素晴らしい未来が待っています！', recipient: 'From: 山田' },
        { text: '新しい旅立ちを祝福します！', recipient: 'From: 鈴木' },
        { text: 'これからも元気で頑張ってね！', recipient: 'From: 佐藤' },
        { text: 'たくさんの思い出をありがとう！', recipient: 'From: 伊藤' },
        { text: 'あなたの努力はみんなの誇りです！', recipient: 'From: 中村' },
        { text: '新しい世界へ向かって飛び立とう！', recipient: 'From: 渡辺' },
        { text: '未来が明るく輝きますように！', recipient: 'From: 加藤' },
        { text: '笑顔でこれからも進んでください！', recipient: 'From: 小林' },
        { text: '卒業は新たな始まりです！', recipient: 'From: 松本' },
        // Add more messages to make up 20
    ];

    // Function to load more messages
    function loadMoreMessages() {
        if (messageCount >= totalMessages) return; // Stop if all messages are loaded
        for (let i = 0; i < messagesPerLoad; i++) {
            if (messageCount >= totalMessages) break;

            const message = document.createElement('div');
            message.classList.add('message');

            // Alternate left and right classes for zigzag pattern
            if (messageCount % 2 === 0) {
                message.classList.add('left');
            } else {
                message.classList.add('right');
            }

            // Create overlay text on the flower image
            const overlayText = document.createElement('div');
            overlayText.classList.add('overlay-text');
            overlayText.textContent = messages[messageCount].text;

            // Create recipient text in the bottom-right corner
            const recipient = document.createElement('div');
            recipient.classList.add('recipient');
            recipient.textContent = messages[messageCount].recipient;

            message.appendChild(overlayText);
            message.appendChild(recipient);
            messageList.appendChild(message);
            messageCount++;
        }
    }

    // Initial load of messages
    loadMoreMessages();

    // Infinite scroll implementation
    window.addEventListener('scroll', function() {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
            loadMoreMessages();
        }

        // Check if we have reached the bottom of the page to trigger the final message
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 100) {
            finalOverlay.classList.add('show'); // Show the final overlay with fade-in
        }
    });

    // Cover fade out after a few seconds
    setTimeout(function() {
        document.getElementById('cover').classList.add('hide');
        setTimeout(function() {
            document.getElementById('cover').style.display = 'none';
            document.getElementById('content').style.display = 'block';
        }, 2000); // Wait for fade out to complete
    }, 3000);
    
    // Click event to close the overlay
    finalOverlay.addEventListener('click', function() {
        finalOverlay.classList.remove('show'); // Fade out the overlay
    });
});
