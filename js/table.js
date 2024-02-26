// json 데이터 가져오기
var data = JSON.parse(JSON.stringify(book));

/* 테이블을 만드는 비우는 함수 */
function clearTable() {
  var tableBody = document.getElementById("tableBody");

  // 테이블의 tbody 내부의 HTML을 빈 문자열로 설정하여 모든 자식 요소를 제거
  tableBody.innerHTML = '';
}

/* json파일로 테이블을 만드는 함수 */
function createTable(data) {
  //table을 비우고 새로 만들어야함
  clearTable();

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

  // values 배열의 각 요소를 input에 추가
  document.getElementById("userId").value = values[0];
  document.getElementById("id").value = values[1];
  document.getElementById("title").value = values[2];
  document.getElementById("completed").value = values[3];
  
  var postInputs = document.getElementsByClassName("postInput");

  // 모든 요소에 대해 readOnly로 설정
  for (var i = 0; i < postInputs.length; i++) {
      postInputs[i].readOnly = true;
  }

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
  // 버튼, readOnly 초기화
  enterX();
  // 팝업 감추기
  document.getElementById("post").style.display = "none";

  // 팝업 내용 초기화
  clearPost();

  document.getElementById("postTable").style.display = "block";
}

// Delete 버튼이 클릭될 때 실행되는 함수
function deleteRow() {
  // id와 일치하는 객체를 찾아서 삭제
  
  // id가 "id"인 input 요소의 값을 가져와서 postId 변수에 담기
  var postId = document.getElementById("id").value;
  console.log("postId: ",postId);

  data = data.filter(function(item) {
    return String(item.id) !== postId;
  });

  closePost();
  // 테이블 업데이트
  createTable(data);
}

// update 버튼 함수
function updateRow() {
  var postInputs = document.getElementsByClassName("postInput");

  var currentIdFromHTML = document.getElementById("id").value;
  console.log("currentIdFromHTML: ",currentIdFromHTML);

  // readOnly 해제
  postInputs[2].readOnly = false;
  postInputs[3].readOnly = false;

  document.getElementById("delete").style.display = "none";
  document.getElementById("update").style.display = "none";
  document.getElementById("enter").style.display = "inline";

}

// 수정 버튼
function enterRow() {
  
  // 가정: 현재 HTML에서 어떤 방식으로든 id 값을 가져왔다고 가정
  var currentIdFromHTML = document.getElementById("id").value;
  console.log("currentIdFromHTML: ",currentIdFromHTML);

  // data에서 id가 현재 HTML의 id 값과 일치하는 객체 찾기
  var targetObject = data.find(function(item) {
    return item.id === parseInt(currentIdFromHTML);
  });

  if (targetObject) {
    var newTitleInput = document.getElementById("title").value; // 새로운 title 값

    // 찾은 객체의 title 값을 새로운 값으로 변경
    targetObject.title = newTitleInput;

    // 변경된 data 출력
    console.log(data);
  } else {
    console.log("No matching object found.");
  }

  closePost();
  createTable(data);

}

// 버튼, readOnly 초기화 함수
function enterX() {
  // 버튼 원위치
  document.getElementById("delete").style.display = "inline";
  document.getElementById("update").style.display = "inline";
  document.getElementById("enter").style.display = "none";

  // readOnly 설정
  // 모든 요소에 대해 readOnly로 설정
  var postInputs = document.getElementsByClassName("postInput");

  for (var i = 0; i < postInputs.length; i++) {
    postInputs[i].readOnly = true;
  }
}