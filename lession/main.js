var ListCoursesBlock = document.querySelector('#List-courses')

var coursesApi = 'http://localhost:3000/courses';


function start() {
    getCourses(renderCourses);

    handleCreateForm();
}

start();

// Function 
function getCourses(callBack) {
    fetch(coursesApi)
        .then(function(response){
            return response.json(); 
        })
        .then(callBack)
}

function createCourse(data, callBack){

     var option = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(data)
     }

    fetch(coursesApi, option)
        .then(function(response){
            return response.json();
        })
        .then(callBack)
}

function handleDeleteCourses(id) {

        var option = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
        }

    fetch(coursesApi + '/' + id, option)
        .then(function(response){
            return response.json();
        })
        .then(function(){
            var courseItem = document.querySelector('.course-item' + id)
            if (courseItem){
                courseItem.remove();
            }
        })
}

function renderCourses(courses){
    var htmls = courses.map(function(course){
        return` 
        <li class="course-item-${course.id}">
            <h2>${course.name}</h2>
            <p>${course.description}</p>
            <button onclick="handleDeleteCourses(${course.id})">Xóa</button>
        </li>
        `;
    })
    ListCoursesBlock.innerHTML = htmls.join('');
}

function handleCreateForm() {
    var createBtn = document.querySelector('#create')

    createBtn.onclick = function (){
        var name = document.querySelector('input[name = "name"]').value;
        var description = document.querySelector('input[name = "description"]').value;

        var formData = {
            name: name,
            description: description,
        }

        createCourse(formData, function(){
            getCourses(renderCourses);
        })
    }
}
