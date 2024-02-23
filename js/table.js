// json 데이터 가져오기
// GET 요청
/* 
fetch('/data/data.json') 
  .then(response => {
    // HTTP 응답 상태 코드를 확인합니다.
    if (!response.ok) {
      // 응답이 성공적이지 않으면 에러를 발생시킵니다.
      throw new Error('error');
    }
    // JSON 형태로 응답 데이터를 파싱하여 반환합니다.
    return response.json();
  })
  .then(data => {
    // 이전 단계에서 파싱한 JSON 데이터를 사용하여 작업합니다.
    createTable(data);
  })
  .catch(error => {
    // 예외가 발생하면 이 부분에서 처리합니다.
    console.error('Fetch failed:', error);
  });
*/
var data = JSON.parse(JSON.stringify(book));

// json파일로 테이블을 만드는 함수
function createTable(data) {
  console.log("test2");
  var tableBody = document.getElementById('tableBody');

  data.forEach(function(item) {
    var row = tableBody.insertRow();
    
    var userIdCell = row.insertCell(0);
    userIdCell.textContent = item.userId;
    
    var idCell = row.insertCell(1);
    idCell.textContent = item.id;
    
    var titleCell = row.insertCell(2);
    titleCell.textContent = item.title;
    
    var completedCell = row.insertCell(3);
    completedCell.textContent = item.completed;
  });
}

createTable(data);
  