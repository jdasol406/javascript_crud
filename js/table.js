// json 데이터 가져오기
var data = JSON.parse(JSON.stringify(book));

/* 테이블을 비우는 함수 */
function clearTable() {
  var tableBody = document.getElementById("tableBody");

  tableBody.innerHTML = "";
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

createTable(data);

/* tr클릭 이벤트 */
document.getElementById("tableBody").addEventListener("click", function(event) {
  var targetRow = event.target.closest("tr");
  
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
  enterX();

  document.getElementById("post").style.display = "none";

  clearPost();

  document.getElementById("postTable").style.display = "block";
}

/* Delete 버튼이 클릭될 때 실행되는 함수 */ 
function deleteRow() {
  // id가 "id"인 input 요소의 값을 가져와서 postId 변수에 담기
  var postId = document.getElementById("id").value;
  console.log("postId: ", postId);
  
  data = data.filter(function(item) {
    // id와 일치하는 객체를 찾아서 삭제
    return String(item.id) !== postId;
  });

  createTable(data);
    
  closePost();
}

/* update 버튼 함수 */ 
function updateRow() {
  var postInputs = document.getElementsByClassName("postInput");

  // readOnly 해제
  postInputs[2].readOnly = false;
  postInputs[3].readOnly = false;

  document.getElementById("delete").style.display = "none";
  document.getElementById("update").style.display = "none";
  document.getElementById("enter").style.display = "inline";
}

/* 수정 버튼 */ 
function enterRow() {
  // 입력 필드 값 가져오기
  var userId = document.getElementById("userId").value;
  var title = document.getElementById("title").value;
  var completed = document.getElementById("completed").value;

  // 입력 필드 중 하나라도 비어있으면 알림창 띄우기
  if (userId === "" || title === "" || completed === "") {
    alert("입력 필드를 모두 채워주세요.");

    // 팝업 닫기
    closePost();
    return;
  }
  
  var currentIdFromHTML = document.getElementById("id").value;

  // data에서 id가 현재 HTML의 id 값과 일치하는 객체 찾기
  var targetObject = data.find(function(item) {
    return String(item.id) === currentIdFromHTML;
  });

  if (targetObject) {
    var newTitleInput = document.getElementById("title").value; // 새로운 title 값
    var newCompletedInput = document.getElementById("completed").value; // 새로운 completed 값
    // 찾은 객체의 title 값을 새로운 값으로 변경
    targetObject.title = newTitleInput;

    // 찾은 객체의 title 값을 새로운 값으로 변경
    targetObject.completed = newCompletedInput;

    // 변경된 data 출력
    console.log(data);
  } else {
    console.log("No matching object found.");
  }

  createTable(data);
    
  closePost();
}

/* 버튼, readOnly 초기화 함수 */ 
function enterX() {
  // 버튼 원위치
  document.getElementById("delete").style.display = "inline";
  document.getElementById("update").style.display = "inline";
  document.getElementById("create-btn").style.display = "inline";
  document.getElementById("enter").style.display = "none";
  document.getElementById("create-post").style.display = "none";

  // readOnly 설정
  // 모든 요소에 대해 readOnly로 설정
  var postInputs = document.getElementsByClassName("postInput");

  for (var i = 0; i < postInputs.length; i++) {
    postInputs[i].readOnly = true;
  }
}

/* create-btn 눌렀을 때 실행되는 함수 */
function createBtn() {
  document.getElementById("postTable").style.display = "none";
  document.getElementById("create-post").style.display = "block";
  document.getElementById("create-btn").style.display = "none";

  // 현재 데이터 배열에 있는 id 값 중 가장 큰 값
  var maxId = 0;

  // 데이터 배열이 비어있지 않은 경우 실행
  if (data.length > 0) {
    var currentIds = [];

    // 데이터 배열(data)의 각 객체의 id 속성 값 추출
    for (var i = 0; i < data.length; i++) {
      currentIds.push(parseInt(data[i].id));
    }

    // currentIds 배열 중 가장 큰 값 찾아서 maxId에 할당
    maxId = Math.max.apply(null, currentIds);
  }

  // 새로운 id 값
  var newId = maxId + 1;

  console.log("newID Type: ",typeof(newId));

  document.getElementById("create-id").value = newId;
}

/* create input값 비우기 함수 */
function createInputClear() {
  document.getElementById("create-userId").value= "";
  document.getElementById("create-title").value= "";
  document.getElementById("create-completed").value= "";
}

/* 새로운 row 만드는 함수 */
function createRow() {
  // 입력 필드 값 가져오기
  var userId = document.getElementById("create-userId").value;
  var title = document.getElementById("create-title").value;
  var completed = document.getElementById("create-completed").value;

  // 입력 필드 중 하나라도 비어있으면 알림창 띄우기
  if (userId === "" || title === "" || completed === "") {
    alert("입력 필드를 모두 채워주세요.");
    // input값 비우기
    createInputClear();
    // 팝업 닫기
    closePost();
    return;
  }

  // 새로운 객체 생성
  var newObject = {
    userId: document.getElementById("create-userId").value,
    id: document.getElementById("create-id").value,
    title: document.getElementById("create-title").value,
    completed: document.getElementById("create-completed").value
  };

    // data 배열에 새로운 객체 추가
    data.push(newObject);

    createTable(data);

    createInputClear(); 

    closePost();
}

