// 題庫
const questionBank = {
    "3_1": [
              { question:"m_d(3)",hint:"發瘋的、生氣的",sound:"31001.mp3",answer:"mad"},
              { question:"m_t(3)",hint:"地墊",sound:"31002.mp3",answer:"mat"},
              { question:"m__k(4)",hint:"牛奶",sound:"31003.mp3",answer:"milk"},
              { question:"h_(2)",hint:"他",sound:"31004.mp3",answer:"he"},
              { question:"s_e(3)",hint:"她",sound:"31005.mp3",answer:"she"},
             ],
    "3_2": [
              { question:"e____n(6)",hint:"十一",sound:"32001.mp3",answer:"eleven"},
              { question:"t____e(6)",hint:"十二",sound:"32002.mp3",answer:"twelve"},
              { question:"u___r(5)",hint:"在…下面",sound:"32003.mp3",answer:"under"},
              { question:"g____d(6)",hint:"地面",sound:"32004.mp3",answer:"ground"},
              { question:"c___t(5)",hint:"數",sound:"32005.mp3",answer:"count"},
             ],
    "4_1": [
              { question:"z__o(4)",hint:"零",sound:"41001.mp3",answer:"zero"},
              { question:"t______n(8)",hint:"十三",sound:"41002.mp3",answer:"thirteen"},
              { question:"f______n(8)",hint:"十四",sound:"41003.mp3",answer:"fourteen"},
              { question:"s__d(4)",hint:"種子",sound:"41004.mp3",answer:"seed"},
              { question:"f___t(5)",hint:"第一的",sound:"41005.mp3",answer:"first"},
             ],
    "4_2": [
              { question:"t____y(6)",hint:"三十",sound:"42001.mp3",answer:"thirty"},
              { question:"f___y(5)",hint:"四十",sound:"42002.mp3",answer:"forty"},
              { question:"f___y(5)",hint:"五十",sound:"42003.mp3",answer:"fifty"},
              { question:"w_(2)",hint:"我們",sound:"42004.mp3",answer:"we"},
              { question:"o_r(3)",hint:"我們的",sound:"42005.mp3",answer:"our"}
             ],
    "5_1": [
              { question:"S____y(6)",hint:"星期日",sound:"51001.mp3",answer:"Sunday"},
              { question:"d_y(3)",hint:"天/白天",sound:"51002.mp3",answer:"day"},
              { question:"p__y(4)",hint:"玩耍",sound:"51003.mp3",answer:"play"},
              { question:"m__t(4)",hint:"肉",sound:"51004.mp3",answer:"meat"},
              { question:"a_t(3)",hint:"藝術",sound:"51005.mp3",answer:"art"},
             ],
    "5_2": [
              { question:"n___e(5)",hint:"護士",sound:"52001.mp3",answer:"nurse"},
              { question:"m_____n(7)",hint:"郵差",sound:"52002.mp3",answer:"mailman"},
              { question:"b______g(8)",hint:"建築物",sound:"52003.mp3",answer:"building"},
              { question:"d_______t(9)",hint:"不同的",sound:"52004.mp3",answer:"different"},
              { question:"s__e(4)",hint:"相同的",sound:"52005.mp3",answer:"same"},
             ],
    "6_1": [
              { question:"j_g(3)",hint:"慢跑",sound:"61001.mp3",answer:"jog"},
              { question:"c_t(3)",hint:"砍/切",sound:"61002.mp3",answer:"cut"},
              { question:"k__d(4)",hint:"仁慈的",sound:"61003.mp3",answer:"kind"},
              { question:"w___l(5)",hint:"輪子",sound:"61004.mp3",answer:"wheel"},
              { question:"f____t(6)",hint:"忘記",sound:"61005.mp3",answer:"forget"},
    ],
    "6_2": [
              { question:"z_o(3)",hint:"動物園",sound:"62001.mp3",answer:"zoo"},
              { question:"c__p(4)",hint:"拍手",sound:"62002.mp3",answer:"clap"},
              { question:"c____h(6)",hint:"教堂",sound:"62003.mp3",answer:"church"},
              { question:"N_____k(7)",hint:"紐約",sound:"62004.mp3",answer:"NewYork"},
              { question:"T___o(5)",hint:"東京",sound:"62005.mp3",answer:"Tokyo"},
             ],
	// 其他級別可以依此格式添加
};

// 初始化測驗頁面
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const difficulty = urlParams.get('difficulty'); // 取得難度等級
    const questionContainer = document.getElementById('questions');
    const questionSet = questionBank[difficulty] || []; // 根據難度選擇題庫

    // 如果沒有題目，顯示提示
    if (questionSet.length === 0) {
        questionContainer.innerHTML = "<p>No questions available for this level.</p>";
        return;
    }

    // 創建表格
    const table = document.createElement('table');
    table.style.borderCollapse = 'collapse';
    table.style.margin = '0 auto';
    table.style.width = '80%';

    // 表頭
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
        <th style="border: 1px solid black; padding: 8px; text-align: center;">No.</th>
        <th style="border: 1px solid black; padding: 8px; text-align: center;">Question</th>
        <th style="border: 1px solid black; padding: 8px; text-align: center;">Your Answer</th>
        <th style="border: 1px solid black; padding: 8px; text-align: center;">Hint</th>
        <th style="border: 1px solid black; padding: 8px; text-align: center;">Sound</th>
    `;
    table.appendChild(headerRow);

    // 顯示題目
    questionSet.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="border: 1px solid black; padding: 8px; text-align: center;">${index + 1}</td>
            <td style="border: 1px solid black; padding: 8px; text-align: center;">${item.question}</td>
            <td style="border: 1px solid black; padding: 8px; text-align: center;">
                <input type="text" id="answer${index}" placeholder="Enter your answer here" />
            </td>
            <td style="border: 1px solid black; padding: 8px; text-align: center;">${item.hint}</td>
            <td style="border: 1px solid black; padding: 8px; text-align: center;">
                <button onclick="playSound('${item.sound}')">Play Sound</button>
            </td>
        `;
        table.appendChild(row);
    });

    questionContainer.appendChild(table);

    // 提交按鈕邏輯
    document.getElementById('submitTest').addEventListener('click', () => {
        let score = 0;
        questionSet.forEach((item, index) => {
            const answer = document.getElementById(`answer${index}`).value.trim();
            if (answer === item.answer) { // 注意：大小寫視為相異
                score += 2;
            }
        });

        // 顯示分數
        const scoreElement = document.getElementById('score');
        scoreElement.style.display = 'block';
        scoreElement.innerHTML = `<h2>Your Score: ${score}</h2>`;
    });
});

// 播放聲音
function playSound(soundFile) {
    const audio = new Audio(soundFile);
    audio.play();
}
