const createStudent = (name, year) => ({
  name,
  year,
  courses: [],

  info() {
    console.log(`${this.name} is a ${this.year} student`);
  },

  listCourses() {
    return this.courses;
  },

  addCourse(course) {
    this.courses.push(course);
  },

  getCourseByCode(courseCode) {
    let foundCourse;
    this.courses.forEach((course) => {
      if (course.code === courseCode) foundCourse = course;
    });
    return foundCourse;
  },

  getCourseByName(name) {
    let foundCourse;
    this.courses.forEach((course) => {
      if (course.name === name) foundCourse = course;
    });
    return foundCourse;
  },

  addNote(courseCode, note) {
    let course = this.getCourseByCode(courseCode);
    if (course) {
      if (course.note) course.note += `; ${note}`;
      else course.note = note;
    }
  },

  updateNote(courseCode, note) {
    let course = this.getCourseByCode(courseCode);
    if (course) course.note = note;
  },

  viewNotes() {
    this.courses.forEach((course) => {
      if (course.note) console.log(`${course.name}: ${course.note}`);
    });
  },
});

const school = {
  students: [],

  addStudent(name, year) {
    if (!["1st", "2nd", "3rd", "4th", "5th"].includes(year)) {
      console.log("Invalid Year");
      return undefined;
    }
    const student = createStudent(name, year);
    this.students.push(student);
    return student;
  },

  enrollStudent(student, course) {
    student.courses.push(course);
  },

  addGrade(student, name, grade) {
    const course = student.getCourseByName(name);
    if (course) course.grade = grade;
  },

  getReportCard(student) {
    for (let course of student.courses) {
      console.log(
        `${course.name}: ${course.grade ? course.grade : "In progress"}`
      );
    }
  },

  getCourseReport(name) {
    console.log(`=${name} Grades=`);
    let studentCount = 0;
    let sumOfGrades = 0;
    for (let student of this.students) {
      if (
        student.getCourseByName(name) &&
        student.getCourseByName(name).grade
      ) {
        console.log(`${student.name}: ${student.getCourseByName(name).grade}`);
        studentCount += 1;
        sumOfGrades += student.getCourseByName(name).grade;
      }
    }
    console.log(`Course Average: ${Math.round(sumOfGrades / studentCount)}`);
  },
};

let studentFoo = school.addStudent("Foo", "3rd");
school.enrollStudent(studentFoo, { name: "Math", code: 101 });
school.enrollStudent(studentFoo, { name: "Advanced Math", code: 102 });
school.enrollStudent(studentFoo, { name: "Physics", code: 202 });

let studentBar = school.addStudent("Bar", "1st");
school.enrollStudent(studentBar, { name: "Math", code: 101 });

let studentQux = school.addStudent("Qux", "2nd");
school.enrollStudent(studentQux, { name: "Math", code: 101 });
school.enrollStudent(studentQux, { name: "Advanced Math", code: 102 });

school.addGrade(studentFoo, "Math", 95);
school.addGrade(studentFoo, "Advanced Math", 90);
school.addGrade(studentBar, "Math", 91);
school.addGrade(studentQux, "Advanced Math", 90);
school.addGrade(studentQux, "Math", 93);

school.getReportCard(studentFoo);
school.getCourseReport("Math");
school.getCourseReport("Advanced Math");
school.getCourseReport("Physics");
