const { gql } = require("apollo-server");

const typeDefs = gql`
  type Faculty {
    faculty: String!
    faculty_name: String!
  }

  type Pulpit {
    pulpit: String!
    pulpit_name: String!
    faculty: Faculty!
  }

  type Teacher {
    teacher: String!
    teacher_name: String!
    pulpit: Pulpit!
  }

  type Subject {
    subject: String!
    subject_name: String!
    pulpit: Pulpit!
  }

  type Query {
    faculty(id: String): [Faculty]
    pulpit(id: String): [Pulpit]
    subject(id: String): [Subject]
    teacher(id: String): [Teacher]
    getTeachersByFaculty(faculty: String!): [Teacher]
    getSubjectsByFaculty(faculty: String!): [Subject]
  }

  type Mutation {
    setFaculty(id: String!, faculty_name: String!): Faculty!
    setPulpit(id: String!, pulpit_name: String!, faculty: String!): Pulpit!
    setSubject(id: String!, subject_name: String!, pulpit: String!): Subject!
    setTeacher(id: String!, teacher_name: String!, pulpit: String!): Teacher!
    delFaculty(id: String!): Boolean!
    delPulpit(id: String!): Boolean!
    delSubject(id: String!): Boolean!
    delTeacher(id: String!): Boolean!
  }
`;

module.exports = typeDefs;
