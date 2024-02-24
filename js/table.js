// json 데이터 가져오기
var data = JSON.parse(JSON.stringify(book));

/* 테이블을 만드는 비우는 함수 */
function clearTable() {
  var tableBody = document.getElementById("tableBody");

  // 테이블의 tbody 내부의 자식 요소들을 모두 제거
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }
}

/* json파일로 테이블을 만드는 함수 */
function createTable(data) {
  //table을 비우고 새로 만들어야함
  clearTable();
  console.log("createTable");
  console.log(data)
  var tableBody = document.getElementById("tableBody");

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

console.log("test");
createTable(data);

function clearTable() {
  var tableBody = document.getElementById("tableBody");

  // 테이블의 tbody 내부의 자식 요소들을 모두 제거
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }
}

/* tr클릭 함수 */
document.getElementById("tableBody").addEventListener("click", function(event) {
  var targetRow = event.target.closest('tr');
  
  if (targetRow) {
    var values = [];
    
    Array.from(targetRow.children).forEach(function(cell) {
        values.push(cell.textContent);
    });

    console.log("Clicked Row Values:", values);
    showPost(values);
  }
});

/* 클릭된 tr의 값을 팝업에 표시하는 함수 */
function showPost(values) {
  // 팝업 보이기
  document.getElementById("postTable").style.display = "none";
  document.getElementById("post").style.display = "block";

  // 팝업 내용 채우기
  var postContent = document.getElementById("post");

  // values 배열의 각 요소를 input에 추가
  
    document.getElementById("userId").value = values[0];
    document.getElementById("id").value = values[1];
    document.getElementById("title").value = values[2];
    document.getElementById("completed").value = values[3];
    input.readOnly = true; // 읽기 전용으로 설정
    postContent.appendChild(input);

}

/* post input값 비우기 함수 */
function clearPost() {
  document.getElementById("userId").value = "";
  document.getElementById("id").value = "";
  document.getElementById("title").value = "";
  document.getElementById("completed").value = "";
}

/* 팝업 닫기 함수 */ 
function closePost() {
  // 팝업 감추기
  document.getElementById("post").style.display = "none";

  // 팝업 내용 초기화
  clearPost();

  document.getElementById("postTable").style.display = "block";

  //location.reload();
}

// Delete 버튼이 클릭될 때 실행되는 함수
function deleteRow() {
  // id와 일치하는 객체를 찾아서 삭제
  
  data = data.filter(function(item) {
    // id가 "id"인 input 요소의 값을 가져와서 postId 변수에 담기
    var postId = document.getElementById("id").value;

    // console.log("itemId: ", item.id);
    // console.log("id", postId);
    return String(item.id) !== postId;

  });

  closePost();
  // 테이블 업데이트
  createTable(data);
  console.log(data)
}

