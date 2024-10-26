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
        {text: '丹生ちゃんがいたから日向坂の事をたくさん好きになれました！いつも素敵な笑顔でいてくれてありがとう！！', recipient: 'とりこ'},
        {text: '丹生ちゃんを推してるの最高に幸せでした！ありがとう！！！', recipient: 'Tomorrowも、ともろう'},
        {text: '丹生ちゃんの笑顔が好きで、僕は日向坂を好きになりました。本当にありがとう！卒業後も応援してます！', recipient: 'ともなり'},
        {text: 'にぶちゃんとお話するのは叶わなかったけど、6年間応援できて幸せでした！卒業おめでとう！だいすき！', recipient: 'ほゎ'},
        {text: '丹生ちゃんが居たから日向坂を応援するのが楽しかった！これからもずっとずっと応援させてくださいね( *ᴗˬᴗ)⁾⁾', recipient: 'まじゃめたる'},
        {text: 'にぶちゃんがきっかけで日向坂を本格的に好きになってライブに行けるようになりました！！\nこれだけ本気になれたのは、にぶちゃんのおかげだよ^ ^卒業しても応援してるからね！', recipient: '門脇周平'},
        {text: 'にぶちゃん今までアイドルお疲れさま！にぶちゃんの笑顔にたくさん救われました。にぶちゃん推しててよかった〜にぶちゃんアイドルになってくれて本当にありがとう！', recipient: 'ふんふん'},
        {text: '丹生ちゃんはいつもニコニコな笑顔で日向坂46を明るくしてくれてありがとうございました！', recipient: '藤森太一'},
        {text: 'にぶちゃんに出会えたこと大切な宝物です！！\nこれからの人生に幸あれ♡にぱーっ！！', recipient: 'ぺーーーさん'},
        {text: '丹生ちゃん卒業おめでとう！\n最後の瞬間まで思う存分アイドルを楽しんでね🧡', recipient: 'ふぇると'},
        {text: 'にぶちゃんへ\n\nこれまでたくさんの幸せをありがとうございました！！卒業は寂しいけど次のステップへ進むにぶちゃんをこれからも応援し続けます！これからも溢れ出すハッピーオーラでたくさんの人を笑顔にしてください！！', recipient: '目から鱗滝'},
        {text: 'にぶちゃん卒業おめでとう！休業して戻ってきてくれた時は涙出た！卒業してもにぶちゃんのこと大好きだよ！', recipient: 'へっぽこジョー太郎'},
        {text: 'どんな時も笑顔で元気付けてくれるにぶちゃんはハッピーオーラそのものでした。今までたくさんの幸せを届けてくれて本当にありがとう！', recipient: 'あい'},
        {text: '丹生ちゃんのおかげで頑張れたこと、乗り越えられたことがたくさんあります。幸せにしてくれてありがとう！', recipient: 'しょうへい'},
        {text: 'いつも丹生ちゃんのにぱっと明るい太陽のような笑顔に元気をもらっていました。いつも励まされ再び頑張れました。アイドル丹生明里ずっと大好きです！ありがとう！', recipient: 'はな'},
        {text: '丹生さんのことがずっと、す、すっ、す_______________。', recipient: 'にげ'},
        {text: '卒業おめでとう！にぶちゃんの笑顔が大好き！これからもいっぱい笑顔でいようね。', recipient: 'セイシン'},
        {text: 'こんなにも長く1人の人を応援し続けたのは初めてでした。ずっとずっとにぶちゃんが大好きです！！', recipient: 'ののん'},
        {text: 'たくさんの幸せな思い出をありがとう。\n丹生ちゃんはずっと私のアイドルです！\n丹生ちゃんの未来に幸あれ！', recipient: 'なお'},
        {text: 'ご卒業おめでとうございます☆\n\n丹生ちゃんの輝く様な笑顔と元気さにいつも元気をもらってました。\n\nこれからも丹生ちゃんらしく頑張ってくださいᡣ(*^^*)', recipient: 'しょしょ'},
        {text: '。', recipient: 'てらお🐸南山'},
        {text: '丹生ちゃんの無邪気な笑顔に沢山の元気貰えました！沢山のありがとう。', recipient: 'チト'},
        {text: '丹生ちゃんを応援して見た景色、丹生ちゃんのお陰で繋がれたご縁。全部大切な宝物だよ。卒業おめでとう。', recipient: 'たるはし'},
        {text: '卒業おめでとう！丹生ちゃんの笑顔にたくさんたくさん救われてきました。真摯にファンに向き合い、仲間を常に思いやり、「ハッピーオーラ」を誰よりも大切にし続ける姿は本当にかっこよくて、常に憧れであり大きな誇りでした…！心からありがとう。卒業してからも素敵な出会いに溢れていますように！', recipient: 'とらん'},
        {text: '丹生ちゃんの明るくて元気でとても素敵な笑顔がとても大好きでした。卒業は少し残念ですが、この先の新たな活躍を期待しています。', recipient: 'さわやか大魔神'},
        {text: 'ご卒業おめでとうございます！にぶちゃんに沢山の元気を貰えて頑張れました！今後のご活躍をお祈りします！', recipient: '隆太'},
        {text: '丹生ちゃんを推せて幸せでした。卒業後の活躍もとても楽しみにしています！', recipient: 'りょうすけ'},
        {text: 'いつもにぱーをありがとう！これからもにぱーな丹生ちゃんをずっと側で見守らせてくれたら嬉しいです！', recipient: 'ぴーちゃん'},
        {text: '丹生明里ちゃん、卒業おめでとう！そしてアイドルとしてお疲れ様でした。わたしはどんなときもにぶちゃんの笑顔に支えられて癒されてきました。本当に大好きです！これからもずっとずっと応援しています！', recipient: 'あんこ'},
        {text: '丹生ちゃん卒業おめでとう！\n丹生ちゃんの笑顔が大好きだ～♡', recipient: 'あづ'},
        {text: '丹生ちゃんアイドル生活お疲れ様でした！\n丹生ちゃん推しとしてたくさんライブで丹生ちゃんのアイドル姿を見れて最高でした！卒業してもずっと応援していきます！', recipient: 'チョッピー'},
        {text: '丹生ちゃんの笑顔はいつも私に大きな力を与えてくれました。卒業後はゆっくり休んで、どんなことも順調にいきますように。卒業おめでとうございます！', recipient: 'NING'},
        {text: '「アイドルの丹生ちゃん」をここまでずっと貫いてくれてありがとう。', recipient: 'なっかん'},
        {text: '日向坂46を知って「この子めちゃくちゃ可愛い！推したい！」と思ったのがにぶちゃんでした。おひさま歴は浅いけど最後の最後まで「アイドル丹生明里」を全力で推していこうと思います！', recipient: 'かとちゃん'},
        {text: '卒業おめでとう。\n丹生ちゃんに出会えた奇跡に感謝してるよ。\n卒業後の活躍も楽しみにしてる！\nまたね〜', recipient: 'やっすん'},
        {text: 'にぶちゃん卒業おめでとう！にぶちゃんには、何度も元気をもらい救われました。推しがにぶちゃんで、誇りに思うし本当に良かったよ。\n丹生明里は、究極のアイドルでした。', recipient: 'yuki'},
        {text: 'ずっとずっと大好きです\nこれからも応援してます\n丹生ちゃん卒業おめでとっ', recipient: 'なぎお'},
        {text: '有吉eeeee!を見てファンになりました。卒業してからも応援させていただきますので、丹生ちゃん自身も幸せでいてください。', recipient: 'がらすの'},
        {text: '丹生ちゃん卒業おめでとう！TV受け以上のリアクションを観ていて推しメンになりました！新しい道へ行ったとしても丹生ちゃんのこと忘れないからね…', recipient: 'SHOW_すみ'},
        {text: '丹生ちゃんご卒業おめでとうございます！\nお互い幸せな人生送ろうな！', recipient: 'わんわん'},
        {text: 'にぶちゃんの笑顔がこの先もたくさん咲きますように！卒業おめでとうございます！', recipient: 'かとよ'},
        {text: '今までお疲れ様でした。\n自分はあなたのおかげでアイドルというコンテンツに出会い、何度も元気を貰いました。\nあなたが日向坂で活動をしている時に好きになれて良かった。今後の活躍も期待しています。\n本当にありがとうございました。', recipient: 'おじゃん'},
        {text: 'これまで日向坂に、おひさまに元気をもたらしてくれてありがとう！これからもずっと応援させてください！', recipient: 'かぜ'},
        {text: 'にぶちゃんの笑顔にいつも励まされ、たくさんの元気を貰いました。本当にありがとう！永遠の推しです！', recipient: 'コウタ'},
        {text: '人生に最高の彩りを与えてくれてありがとう！卒業後も応援します', recipient: 'kou'},
        {text: 'たくさんの幸せをありがとう！！\u3000丹生ちゃんの未来がどこまでもあかるくありますように！', recipient: 'れな'},
        {text: 'これからも笑顔で素敵な日々を過ごせますように。ずっと応援してます！\n沢山の幸せをありがとう、大好き！', recipient: 'おかゆ'},
        {text: 'ご卒業おめでとう！\n丹生ちゃんの太陽の様な笑顔に沢山元気を貰いました！\nいっぱい幸せになってね！', recipient: 'のりしお'},
        {text: '卒業おめでとう✨\nにぶちゃんに一目惚れした日からずっとずっと大好きです♡\nこれからも応援してます！', recipient: 'まいな'},
        {text: 'にぶちゃん卒業おめでとう！！カラーチャート大好きです\\♡︎/これから進む道がたくさんの幸せで溢れますように。', recipient: 'ひぃー'},
        {text: '丹生ちゃんご卒業おめでとうございます！アイドル丹生ちゃんを応援できて幸せでした！これからも丹生ちゃんが大好きです！', recipient: 'しゆぴ'},
        {text: '丹生ちゃんの笑顔にたくさん救われました!!私の太陽です!!そんな私の愛してる丹生ちゃん卒業おめでとう!!', recipient: 'れみ'},
        {text: 'あかりちゃんの笑顔がだいすき🧡あかりちゃんと周りの大切な人がこれからも笑顔でいられますように🧡', recipient: 'さえ🐶💕'},
        {text: '卒業おめでとう🥺にぶちゃんは初めてできた最高の推しだよ！これからもずっと大好き🫶🏻', recipient: 'なおちゃん'},
        {text: '丹生ちゃん、ご卒業おめでとうございます。今まで丹生ちゃんの笑顔や言動、パフォーマンスに何度も元気と勇気を貰いました。今までありがとう。卒業後も引き続き応援します！！', recipient: 'タク'},
        {text: '丹生ちゃんにしかないハッピーオーラで\nいつも幸せに過ごせています。\n卒業おめでとう！これからも応援しています！', recipient: 'ゆきの'},
        {text: '丹生ちゃんご卒業おめでとうございます！\nたくさんの幸せと笑顔をいただきました。ありがとう。\nこれからも丹生ちゃんの、幸せを願ってます。', recipient: 'ベル'},
        {text: '長い間本当にお疲れ様でした。丹生ちゃんの笑顔にいつも癒されていました。今後の人生も幸多き人生になる事をお祈り申し上げます。', recipient: 'まるめん'},
        {text: '丹生ちゃんご卒業おめでとうございます 老若男女に愛される丹生ちゃんはこれからも沢山の場面で活躍を見せてくれると思います', recipient: '馬門溪竜'},
        {text: 'にぶちゃんは、私にとって推しメンであり、心の支えでもありました。これからも応援しています。', recipient: '真冬'},
        {text: '丹生ちゃんの太陽みたいに明るい笑顔にいつも元気を貰っていました。卒業おめでとう！', recipient: 'あのさか'},
        {text: 'ご卒業おめでとうございます！！\nたくさんのハッピーオーラをおひさまに届けてくれてありがとう！！', recipient: 'たけ'},
        {text: 'いつも笑顔と癒しをありがとうございました♪ 自慢の推しでしたし、これからも応援しております☆', recipient: 'RADGIMIX'},
        {text: '日向坂46の丹生明里ちゃんに出会えて幸せでした♡これからもずーっと丹生ちゃんを推し続けます！', recipient: 'なつ'},
        {text: '日向坂の活動お疲れ様！沢山の笑顔をありがとう！今後も新たなステージで活躍する丹生ちゃんを応援します！', recipient: 'やま'},
        {text: '卒業おめでとうございます！笑顔でハッピーオーラ全開の丹生ちゃんが大好きです！これからも応援してます！', recipient: 'かなで'},
        {text: 'にぶちゃん、たくさんの元気と笑顔と勇気とパワーと癒しをありがとう！！！！！7年前からわたしの生きる力のみなもとは間違いなくにぶちゃんでした！大好きだよー！！！', recipient: 'あやねっち'},
        {text: '卒業おめでとうございます！丹生ちゃんは今までアイドルに興味がなかった私が初めて推したアイドルです！いつでもニコニコしていて、可愛くて、明るくて、、そんな丹生ちゃんにいつも元気をもらっています！今までもこれからもずっっと大好きです！丹生ちゃんの事を推せて本当に幸せです♡', recipient: 'ねね'},
        {text: '丹生ちゃん約7年間本当にお疲れ様！丹生ちゃんが夢を叶えていく姿を応援できて幸せでした。これからもずっっと応援させてね。', recipient: '宮崎出身Taka'},
        {text: '丹生ちゃんと出会ってから人生がすっごく楽しくなりました✨アイドルになってくれて本当にありがとう😭', recipient: 'なな☘️'}];
    const totalMessages = messages.length; // Total number of messages
    const imageOptions = ['static/丹生1.png', 'static/丹生2.png', 'static/丹生3.png'] ; // ランダム画像リスト
    for (let i = 1; i <= 35; i++) {
        imageOptions.push(`static/linears/イラスト${i}.png`);
    }
    const flowerImageOptions = ["static/flower1.png","static/flower2.png","static/flower3.png"];

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
            const randomFlowerImage = flowerImageOptions[Math.floor(Math.random() * flowerImageOptions.length)];
            message.style.backgroundImage = `url(${randomFlowerImage})`;

            // Alternate left and right classes for zigzag pattern
            if (messageCount % 2 === 0) {
                message.classList.add('left');
            } else {
                message.classList.add('right');
                
            }
            // Create overlay text on the flower image with "more/less" functionality
            const maxLength = 50; // Define the max length for the short version
            const longTextLength = 100;
            const fullText = messages[messageCount].text;
            const shortText = fullText.length > maxLength ? fullText.substring(0, maxLength) + '...' : fullText;
            

            // Create overlay text on the flower image
            const overlayText = document.createElement('div');
            overlayText.classList.add('overlay-text');
            overlayText.textContent = messages[messageCount].text;
            overlayText.textContent = shortText;

            // Create recipient text in the bottom-right corner
            const recipient = document.createElement('div');
            recipient.classList.add('recipient');
            recipient.textContent = messages[messageCount].recipient;


        // Create the "もっと見る" button only if the message is too long
            if (fullText.length > maxLength) {
                const toggleButton = document.createElement('button');
                toggleButton.textContent = 'もっと見る';
                toggleButton.classList.add('toggle-button');
                let isExpanded = false;

                // Add event listener to the button
                toggleButton.addEventListener('click', function() {
                    isExpanded = !isExpanded;
                    if (isExpanded) {
                        overlayText.textContent = fullText;
                        toggleButton.textContent = '閉じる';
                        if (fullText.length > longTextLength) {
                            console.log("Too Long message")
                            overlayText.classList.add('small-font');
                        }
                    } else {
                        overlayText.textContent = shortText;
                        toggleButton.textContent = 'もっと見る';
                        overlayText.classList.remove('small-font');
                    }
                });

                message.appendChild(toggleButton);
            }

            message.appendChild(overlayText);
            message.appendChild(recipient);
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
            // message.appendChild(overlayText);
            // message.appendChild(recipient);
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


    window.addEventListener('scroll', function() {
        const progressBar = document.getElementById('progress-bar');
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    

    // Cover fade out after a few seconds
    setTimeout(function() {
        document.getElementById('cover').classList.add('hide');
        setTimeout(function() {
            document.getElementById('cover').style.display = 'none';
            document.getElementById('content').style.display = 'block';
            canShowOverlay = true;
        }, 2000); // Wait for fade out to complete
    }, 600);
    
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