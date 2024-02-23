// json 데이터 가져오기
var data = JSON.parse(JSON.stringify(book));

/* json파일로 테이블을 만드는 함수 */
function createTable(data) {
  console.log("test2");
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
  document.getElementById("tableBody").style.display = "none";
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


  // 삭제 버튼 생성 및 이벤트 리스너 추가
  /*
  var deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.className = "deleteButton";
  deleteButton.addEventListener("click", function() {
      // 해당 행 제거
      //var rowToRemove = document.getElementById("Id");
      //rowToRemove.parentNode.removeChild(rowToRemove);

      // 팝업 닫기
      closePopup();
  });
  popupContent.appendChild(deleteButton);*/
}
/* post input값 비우기 함수 */
function clearPost() {
  document.getElementById("userId").value = "";
  document.getElementById("id").value = "";
  document.getElementById("title").value = "";
  document.getElementById("completed").value = "";
}

// 팝업 닫기 함수
function closePost() {
  // 팝업 감추기
  document.getElementById("post").style.display = "none";

  // 팝업 내용 초기화
  clearPost();

  document.getElementById("tableBody").style.display = "block";
}
