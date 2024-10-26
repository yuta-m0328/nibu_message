document.addEventListener('DOMContentLoaded', function() {
    const messageList = document.getElementById('message-list');
    const finalOverlay = document.getElementById('final-overlay');
    const closeBtn = document.getElementById('close-btn'); // Close button
    const scrollBottomBtn = document.getElementById('scroll-bottom-btn'); // Scroll button
    let messageCount = 0;
    const messagesPerLoad = 10; // Number of messages per load
    // フェードインを抑制するためのフラグとタイマー
    let canShowOverlay = false; // フェードインが許可されているかどうか
    const fadeOutDelay = 5000; // フェードアウト後に再びフェードインできるまでの遅延時間（5秒）

    const messages = [{text: '丹生ちゃん卒業おめでとうございます！\nこれからもずっと丹生推しです。丹生ちゃんの未来が明るく幸せなものになりますように。', recipient: 'ひかり'},
        {text: 'にぶちゃんの笑顔に沢山癒され、自分も笑顔になりました！にぶちゃんはまさに日向坂の象徴だと思います！にぱー！', recipient: 'シロナマズ'},
        {text: '僕のどん底の人生に丹生ちゃんの笑顔という光をくれてありがとう！大好き！', recipient: 'にっぱ'},
        {text: 'いつも笑顔を絶やさない丹生ちゃんが大好きです！輝く姿から熱い気持ちが伝わってきて勇気もらってました！', recipient: 'くーるちゃんぽん'},
        {text: '丹生ちゃんのハッピーオーラに、笑顔に癒されました。幸せをいっぱいありがとう', recipient: 'DO'},
        {text: '13号ちゃん\u3000日向坂に入ってくれて本当にありがとう\nずっと応援します。あまり無理なさらず頑張ってね', recipient: '地方競馬師たかし'},
        {text: 'にぶちゃんお疲れさまでした！勇者にぶちゃんの冒険はまだまだ続く！これからの活躍も楽しみにしてます！', recipient: 'ころとも'},
        {text: '丹生ちゃん卒業おめでとう！\n丹生ちゃんのおかげで日向坂を好きになって幸せな日々を送ることが出来たから感謝しかないです！ずっと応援してます！', recipient: 'ライト'},
        {text: '明里ちゃん、７年間ありがとう。これまでも、これからも、ずっとずっと唯一の "推しメン" です。', recipient: 'たーく'},
        {text: 'あなたの天真爛漫な笑顔が大好きでした。\nけやき坂、日向坂でアイドルになってくれて本当にありがとう。', recipient: 'せた'},
        {text: '丹生ちゃん卒業おめでとー！いつも天真爛漫な丹生ちゃんが大好きです！たくさんの幸せをくれてありがとう！', recipient: 'もちまるこ'},
        {text: 'これまで何度も丹生ちゃんの笑顔に救われました☺️\n丹生ちゃんは僕にとって一番のアイドルです！', recipient: 'けんた'},
        {text: 'これまでも！これからも！俺の心にパッとあかりを灯せるのはにぶちゃんだけ！！！ありがとう！！！', recipient: 'いおり'},
        {text: '卒業おめでとう！自分の学生時代を支えてくれていたのはアイドル丹生明里でした！これからも笑顔で！', recipient: 'いしとも'},
        {text: '丹生ちゃんのお陰で色んな方々と出会う事が出来たよ！ありがとう！これからも応援してるよ！大好きだよ！！', recipient: 'はこ'},
        {text: '「なんて笑顔がかわいいんだ」\n初めて丹生ちゃんを観た時に思いました。\n卒業おめでとう。今まで沢山その笑顔に救われたよ。本当にありがとうね！\nこれからもその笑顔を応援します！\nファイト丹生ちゃん！', recipient: '岐阜のアッキー'},
        {text: '丹生ちゃんを推し始めてからの人生が間違いなく1番楽しくて幸せです！一生推します！\nこれからもよろしく！', recipient: 'かんた'},
        {text: '卒業おめでとう！\nたくさんの笑顔をありがとう！！\nにぶちゃんの笑顔が大好きです♡', recipient: 'ゆうあ'},
        {text: '丹生ちゃんご卒業おめでとうございます。最後の最後まであかみくをよろしくね。最高の時間をありがとう！', recipient: 'ごう'},
        {text: '丹生ちゃん卒業おめでとう\nアイドル人生お疲れ様でした\nこれからの丹生明里さんの人生も応援してます！！', recipient: 'はせしゅん'},
        {text: '丹生ちゃん大好き！\nにぱー‼️', recipient: 'ナカムラキョウノスケ'},
        {text: '日向坂を知り、ハマるきっかけになったのがにぶにぶしい笑顔とリアクションでした！本当にありがとう！！', recipient: 'りくすけ'},
        {text: 'にぶちゃん\u3000あなたを推してて良かった。幸せな時間を分けてくれてありがとう。', recipient: 'うるし'},
        {text: '丹生ちゃんの存在が日々の糧になりました。卒業後はゆっくりして次のステップの為に力を蓄えてください。', recipient: '麻畝(まほ)'},
        {text: '丹生ちゃんにたくさんの元気、勇気、笑い、〇〇頑張れ！を貰いました。ほんとにありがとうございました！', recipient: 'おたて'},
        {text: 'Congrats on your graduation! I’ll always support you!', recipient: 'PandaPutih'},
        {text: '丹生ちゃん卒業おめでとう。今後の活躍を楽しみにしてます！！丹生ちゃんに出会えて良かった！卒業しても応募するよ！！', recipient: 'SHOW@うどん'},
        {text: 'ご卒業おめでとうございます。貴女は生粋のエンターティナーとして我々に多大なる幸せをもたらしてくださりました。ありがとう！！！', recipient: 'masa'},
        {text: 'ピュアな丹生ちゃんのにぱーにいつも元気を貰ってました！ずっとずっと大好きです！！', recipient: 'ふじ'},
        {text: '丹生ちゃんの天真爛漫さは、皆の心を明るく照らしてくれる、まさに太陽でした。お疲れ様でした‼', recipient: 'マサヤ'},
        {text: '丹生ちゃんの笑顔が大好きです！\nこれからも色んな事にチャレンジした続ける丹生ちゃんを応援してます！！', recipient: 'ダイゴ'},
        {text: '丹生ちゃん\nご卒業おめでとうございます！\nずっとずっと大好きです！\nこれからも応援しています♡', recipient: '綾加'},
        {text: '出会ってからどの瞬間を思い出しても楽しくて幸せに溢れた時間でした！卒業おめでとう。沢山の幸せをありがとう！', recipient: 'あきやん'},
        {text: '卒業おめでとう！ あなたの姿を見ていると、私の心の中に明かりが灯りました。この先の未来も照らして！', recipient: 'けいすけのほう'},
        {text: 'にぶちゃんの笑顔に元気を貰いました\nいっぱいの元気を頂きありがとうございます', recipient: 'かずよし'},
        {text: '虹が道しるべとなり、光溢れる輝かしい未来を歩まれてゆくと信じております。\nご卒業おめでとうございます！', recipient: 'もちー'},
        {text: 'ひらがなの頃からずっと大好きでした！！！推していてずっと幸せでした！これからも丹生ちゃんらしくいてね☺️', recipient: '櫻ふぁむ'},
        {text: '７年間のアイドル活動でもらった笑顔と元気と幸せ、まだまだ返し足りない！これからも応援します！', recipient: 'モザ'},
        {text: '丹生ちゃん推しになってから約6年経つ大学2年生です。丹生ちゃんは自分の青春そのもので、元気や勇気や感動を沢山もらいました！本当にお疲れ様でした！', recipient: 'タッキー26'},
        {text: 'にぶちゃん卒業おめでとう！！\nいつでも明るい笑顔のにぶちゃんが大好きです！！一生縄跳び大魔神です！笑', recipient: 'たかき'},
        {text: '丹生ちゃんご卒業おめでとう御座います。\n丹生ちゃんのハッピーオーラは永遠です。\nこれからもご活躍を期待して応援していきます。', recipient: 'いっちー'},
        {text: '\n丹生ちゃんのハッピースマイルが大好きだよ！', recipient: 'せぃ。'},
        {text: '丹生ちゃん卒業おめでとう！これからもずっと応援します！大好きです！', recipient: 'せい'},
        {text: 'To Nibu-chan who is as bright as the sun, congratulations on your graduation! May your future be bright, just like you!', recipient: 'モニカ'},
        {text: '赤味噌ちゃん ご卒業おめでとうございます！！おみそしるコンビは永遠だよ、大好きです！！', recipient: 'まっぴー'},
        {text: '丹生ちゃん卒業おめでとう！いっつも何かに迷った時はOne choiceを聴いて、自分の決断に自信を持つことにしています。丹生ちゃんの太陽のように明るい笑顔が大好きです！', recipient: 'ありちゃん'},
        {text: '丹生明里さんに幸あれ！', recipient: '桃ちゃんまる'},
        {text: '丹生ちゃんの更なる飛躍を祈ってます🐸アイドルでいてくれてありがとう☀', recipient: 'ミチコロンドン'},
        {text: '丹生ちゃんの全てが大好きで出会えて幸せでした！私の人生を明るくしてくれてありがと〜！卒業おめでとう︎︎☺︎', recipient: 'ましろ'},
        {text: 'にぶちゃんの元気溢れる笑顔を見ているとたくさんの笑顔になれ、その笑顔が元気の源で活力です！\n卒業しても一生最高で最強の推しです！', recipient: 'えまにえる'},
        {text: '卒業おめでとう✨これからもハッピーオーラをみんなに届けてください、ずっと大好きです！', recipient: 'コウイチ'},
        {text: '丹生ちゃんアイドルでいてくれてありがとう！あなたに出会えて幸せです。\n大好き！卒業しても応援するね！', recipient: 'しかまろ'},
        {text: '日向坂46のデビュー時から今までも、これからもずっと自慢の推しです。丹生ちゃん大好き！', recipient: 'ぶーほり'},
        {text: '丹生ちゃんからたくさんの素敵なものを頂けました！アイドルになってくれてありがとう！', recipient: '朋美'},
        {text: 'にぶちゃんのおかげで、ずっっっと元気もらえてました。にぶちゃんの笑顔は宇宙一！！', recipient: 'てんぶ〜'},
        {text: '全然気にしないフリをしても、結局丹生ちゃんのことだけ見てました。', recipient: 'しと'},
        {text: '丹生ちゃんの笑顔が癒しでした！おつかれさま！', recipient: 'まなちゃん！'},
        {text: 'にぶちゃんの笑顔が僕の笑顔の源です。これからもずーっと応援してます。にぶちゃんのことが大好きです！', recipient: 'トマTOマト'},
        {text: 'ありがとう、これからも応援してます', recipient: 'ぺんや'},
        {text: 'にぶちゃんご卒業おめでとうございます！\n実は過去ににぶちゃんのお姿で救われたことがあります。写真集のヘルシーなお腹を見て衝撃を受けまして、結婚式前だった私は冷蔵庫に写真を貼らせて頂き、ダイエットに励むことが出来ました。一生の思い出を自分の満足のいく姿で迎えることが出来たのはにぶちゃんあっての事です。本当に感謝です!!\nにぶちゃんの素敵な性格、お姿はこのようにたくさんの人を救っています。どこにいても、なにをしててもにぶちゃんはどこでも光のある方です。これからも素敵な人生を送ってください!!', recipient: 'ひな'},
    ];
    const totalMessages = messages.length; // Total number of messages
    const imageOptions = ['丹生1.png', '丹生2.png', '丹生3.png']; // ランダム画像リスト

    // Function to load more messages
    function loadMoreMessages() {
        if (messageCount >= totalMessages) return; // Stop if all messages are loaded
        for (let i = 0; i < messagesPerLoad; i++) {
            if (messageCount >= totalMessages) break;

            const messageContainer = document.createElement('div');
            messageContainer.classList.add('message-container');

            const message = document.createElement('div');
            message.classList.add('message');

            const randomImage = imageOptions[Math.floor(Math.random() * imageOptions.length)];

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

            // ランダム画像部分
            const imageContainer = document.createElement('div');
            imageContainer.classList.add('image-container');
            const image = document.createElement('img');
            image.src = randomImage;
            image.classList.add('random-image');
            imageContainer.appendChild(image);

            // 左右に応じて配置
            if (message.classList.contains('left')) {
                messageContainer.appendChild(message);       // メッセージを左側に
                messageContainer.appendChild(imageContainer); // 画像を右側の空白に
            } else {
                messageContainer.appendChild(imageContainer); // 画像を左側の空白に
                messageContainer.appendChild(message);        // メッセージを右側に
            }
            message.appendChild(overlayText);
            message.appendChild(recipient);
            // messageList.appendChild(message);
            messageList.appendChild(messageContainer);
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
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 100 && canShowOverlay) {
            finalOverlay.classList.add('show'); // Show the final overlay with fade-in
        }
    });


    // Cover fade out after a few seconds
    setTimeout(function() {
        document.getElementById('cover').classList.add('hide');
        setTimeout(function() {
            document.getElementById('cover').style.display = 'none';
            document.getElementById('content').style.display = 'block';
            canShowOverlay = true;
        }, 2000); // Wait for fade out to complete
    }, 200);
    
    // Scroll to the bottom button functionality
    scrollBottomBtn.addEventListener('click', function() {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth' // Smooth scroll
        });
    });

    // closeBtn.addEventListener('click', function() {
    //     finalOverlay.classList.remove('show'); // Fade out the overlay
    //     canShowOverlay = false; // 一度フェードアウト後、フェードインを一時的に無効にする
    //     setTimeout(function() {
    //         canShowOverlay = true; // 5秒後にフェードインを再び許可する
    //     }, fadeOutDelay);
    // });
    // Click event to close the overlay
    finalOverlay.addEventListener('click', function() {
        finalOverlay.classList.remove('show'); // Fade out the overlay
        canShowOverlay = false; // 一度フェードアウト後、フェードインを一時的に無効にする
        setTimeout(function() {
            canShowOverlay = true; // 5秒後にフェードインを再び許可する
        }, fadeOutDelay);
    });


    
});