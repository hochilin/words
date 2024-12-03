// 需要引入 SheetJS
let questionBank = {};

// 從 Excel 文件中讀取數據並生成題庫
function loadQuestions(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "words.xlsx", true);
    xhr.responseType = "arraybuffer";

    xhr.onload = function () {
        const data = new Uint8Array(xhr.response);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0]; // 假設使用第一個工作表
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // 解析 Excel 數據，生成題庫
        jsonData.forEach(row => {
            const grade = String(row[0]).trim();
            const word = row[1]?.trim();
            if (!questionBank[grade]) {
                questionBank[grade] = [];
            }
            questionBank[grade].push(word);
        });

        // 顯示載入的資料
        displayLoadedData(jsonData);

        callback();
    };

    xhr.onerror = function () {
        console.error("Error loading the Excel file.");
    	alert("Error loading the Excel file. Check the console for details.");
    };

    xhr.send();
}

// 顯示載入的 Excel 數據
function displayLoadedData(data) {
    const resultContainer = document.getElementById('loadResult');
    if (!resultContainer) return;

    const table = document.createElement('table');
    const tableHeader = document.createElement('thead');
    tableHeader.innerHTML = "<tr><th>Grade</th><th>Word</th></tr>";
    table.appendChild(tableHeader);

    const tableBody = document.createElement('tbody');
    data.forEach(row => {
        const tableRow = document.createElement('tr');
        tableRow.innerHTML = `<td>${row[0]}</td><td>${row[1]}</td>`;
        tableBody.appendChild(tableRow);
    });
    table.appendChild(tableBody);

    resultContainer.innerHTML = '<h2>Loaded Questions:</h2>';
    resultContainer.appendChild(table);
}

// 初始化測驗頁面
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const difficulty = urlParams.get('difficulty');
    const questionContainer = document.getElementById('questions');

    // 從 Excel 載入數據後顯示題目
    loadQuestions(() => {
        const questionSet = questionBank[difficulty] || [];
        if (questionSet.length === 0) {
            questionContainer.innerHTML = "<p>No questions available for this level.</p>";
            return;
        }

        // 顯示題目
        questionSet.forEach((word, index) => {
            const questionElement = document.createElement('div');
            questionElement.innerHTML = `
                <p>Question ${index + 1}: Spell the word "${word}".</p>
                <input type="text" id="answer${index}" />
            `;
            questionContainer.appendChild(questionElement);
        });

        // 提交按鈕邏輯
        document.getElementById('submitTest').addEventListener('click', () => {
            let score = 0;
            questionSet.forEach((word, index) => {
                const answer = document.getElementById(`answer${index}`).value.trim().toLowerCase();
                if (answer === word.toLowerCase()) score += 2;
            });

            const scoreElement = document.getElementById('score');
            scoreElement.style.display = 'block';
            scoreElement.innerHTML = `<h2>Your Score: ${score}</h2>`;
        });
    });
});
