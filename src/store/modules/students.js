export default {
    namespaced: true,
    state: {
        students: [],
        archivedStudents: []
    },
    mutations: {
      GET_STUDENTS (state, payload) {
        state.students = payload
      },
      GET_ARCHIVED (state, payload) {
        state.archivedStudents = payload
      },
      ADD_STUDENT (state, payload) {
        state.archivedStudents = state.archivedStudents.filter(x => payload.index !== x.index)
        state.students.push(payload)
      },
      DELETE_STUDENT (state, payload) {
        state.students = state.students.filter(x => payload.index !== x.index)
        state.archivedStudents.push(payload)
      }
    },
    actions: {
      getStudents ({ commit }) {
        var students = JSON.parse(localStorage.students)
        commit('GET_STUDENTS', students)
      },
      getArchivedStudents ({ commit }) {
        var archivedStudents = JSON.parse(localStorage.archivedStudents)
        commit('GET_ARCHIVED', archivedStudents)
      },
      addStudent ({commit}, body) {
        var tempArchivedStudents = JSON.parse(localStorage.archivedStudents)
        tempArchivedStudents = tempArchivedStudents.filter(x => body.index !== x.index)
        localStorage.archivedStudents = JSON.stringify(tempArchivedStudents)

        var tempStudents = JSON.parse(localStorage.students)
        tempStudents.push(body)
        localStorage.students = JSON.stringify(tempStudents)
        commit('ADD_STUDENT', body)
      },
      editStudents ({ commit }, body) {
        var students = JSON.parse(localStorage.students)
        students = students.filter(x => body.index !== x.index)
        students.push(body)
        localStorage.students = JSON.stringify(students)
        commit('GET_STUDENTS', students)
      },
      addStudentArchived ({commit}, body) {
        var tempStudents = JSON.parse(localStorage.students)
        tempStudents = tempStudents.filter(x => body.index !== x.index)
        localStorage.students = JSON.stringify(tempStudents)
        
        body.archiveDate = new Date().toISOString().split('T')[0]

        var tempArchivedStudents = JSON.parse(localStorage.archivedStudents)
        tempArchivedStudents.push(body)
        localStorage.archivedStudents = JSON.stringify(tempArchivedStudents)
        commit('DELETE_STUDENT', body)
      },
    },
    getters: {
    },
  }
  