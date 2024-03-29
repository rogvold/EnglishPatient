/**
 * Created by sabir on 25.01.16.
 */

var React = require('react');
var assign = require('object-assign');

var Constants = {

    //sounds
    PLAY_SOUND: "PLAY_SOUND",
    SOUND_FINISHED: "SOUND_FINISHED",


    //materials
    LOAD_TEACHER_MATERIALS: "LOAD_TEACHER_MATERIALS",
    LOAD_TEACHER_MATERIALS_SUCCESS: "LOAD_TEACHER_MATERIALS_SUCCESS",
    LOAD_TEACHER_MATERIALS_FAIL: "LOAD_TEACHER_MATERIALS_FAIL",

    LOAD_PUBLIC_MATERIALS: 'LOAD_PUBLIC_MATERIALS',
    LOAD_PUBLIC_MATERIALS_SUCCESS: 'LOAD_PUBLIC_MATERIALS_SUCCESS',

    LOAD_TEACHER_MATERIALS_GROUPS: 'LOAD_TEACHER_MATERIALS_GROUPS',
    LOAD_TEACHER_MATERIALS_GROUPS_SUCCESS: 'LOAD_TEACHER_MATERIALS_GROUPS_SUCCESS',

    LOAD_MATERIALS_GROUPS_FACTORY_LIST: 'LOAD_MATERIALS_GROUPS_FACTORY_LIST',
    LOAD_MATERIALS_GROUPS_FACTORY_LIST_SUCCESS: 'LOAD_MATERIALS_GROUPS_FACTORY_LIST_SUCCESS',

    LOAD_MATERIAL: 'LOAD_MATERIAL',
    LOAD_MATERIAL_SUCCESS: 'LOAD_MATERIAL_SUCCESS',
    DELETE_MATERIAL: 'DELETE_MATERIAL',

    LOAD_MATERIAL_GROUP: 'LOAD_MATERIAL_GROUP',
    LOAD_MATERIAL_GROUP_SUCCESS: 'LOAD_MATERIAL_GROUP_SUCCESS',
    DELETE_MATERIAL_GROUP: 'DELETE_MATERIAL_GROUP',

    LOAD_MATERIAL_GROUPS_BY_TOPIC_ID: 'LOAD_MATERIAL_GROUPS_BY_TOPIC_ID',
    LOAD_MATERIAL_GROUPS_BY_TOPIC_ID_SUCCESS: 'LOAD_MATERIAL_GROUPS_BY_TOPIC_ID_SUCCESS',

    LOAD_MATERIAL_GROUPS_BY_TOPICS_IDS: 'LOAD_MATERIAL_GROUPS_BY_TOPICS_IDS',
    LOAD_MATERIAL_GROUPS_BY_TOPICS_IDS_SUCCESS: 'LOAD_MATERIAL_GROUPS_BY_TOPICS_IDS_SUCCESS',

    LOAD_MATERIAL_GROUPS_BY_GROUPS_IDS: 'LOAD_MATERIAL_GROUPS_BY_GROUPS_IDS',
    LOAD_MATERIAL_GROUPS_BY_GROUPS_IDS_SUCCESS: 'LOAD_MATERIAL_GROUPS_BY_GROUPS_IDS_SUCCESS',


    LOAD_MATERIALS_BY_GROUPS_IDS: 'LOAD_MATERIALS_BY_GROUPS_IDS',
    LOAD_MATERIALS_BY_GROUPS_IDS_SUCCESS: 'LOAD_MATERIALS_BY_GROUPS_IDS_SUCCESS',



    //topics
    LOAD_ALL_TEACHER_TOPICS: 'LOAD_ALL_TEACHER_TOPICS',
    LOAD_ALL_TEACHER_TOPICS_SUCCESS: 'LOAD_ALL_TEACHER_TOPICS_SUCCESS',
    LOAD_ALL_COMMUNITY_TOPICS: 'LOAD_ALL_COMMUNITY_TOPICS',
    LOAD_ALL_COMMUNITY_TOPICS_SUCCESS: 'LOAD_ALL_COMMUNITY_TOPICS_SUCCESS',
    REFRESH_TOPIC_INFO: 'REFRESH_TOPIC_INFO',
    REFRESH_TOPIC_INFO_SUCCESS: 'REFRESH_TOPIC_INFO_SUCCESS',

    DELETE_TOPIC: 'DELETE_TOPIC',
    DELETE_TOPIC_SUCCESS: 'DELETE_TOPIC_SUCCESS',

    UPDATE_TOPIC: 'UPDATE_TOPIC',
    //UPDATE_TOPIC_SUCCESS: 'UPDATE_TOPIC_SUCCESS',

    CREATE_TOPIC: 'CREATE_TOPIC',
    CREATE_TOPIC_SUCCESS: 'CREATE_TOPIC_SUCCESS',



    //users
    LOAD_USER: 'LOAD_USER',
    LOAD_USER_SUCCESS: 'LOAD_USER_SUCCESS',
    LOAD_USERS_BY_IDS: 'LOAD_USERS_BY_IDS',
    LOAD_USERS_BY_IDS_SUCCESS: 'LOAD_USERS_BY_IDS_SUCCESS',
    UPDATE_USER: 'UPDATE_USER',
    UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',

    //exercises
    LOAD_EXERCISE: 'LOAD_EXERCISE',
    LOAD_EXERCISE_SUCCESS: 'LOAD_EXERCISE_SUCCESS',
    DELETE_EXERCISE: 'DELETE_EXERCISE',

    LOAD_EXERCISES_BY_IDS: 'LOAD_EXERCISES_BY_IDS',
    LOAD_EXERCISES_BY_IDS_SUCCESS: 'LOAD_EXERCISES_BY_IDS_SUCCESS',

    LOAD_TEACHER_EXERCISES: 'LOAD_TEACHER_EXERCISES',
    LOAD_TEACHER_EXERCISES_SUCCESS: 'LOAD_TEACHER_EXERCISES_SUCCESS',

    LOAD_COMMUMITY_EXERCISES: 'LOAD_COMMUMITY_EXERCISES',
    LOAD_COMMUMITY_EXERCISES_SUCCESS: 'LOAD_COMMUMITY_EXERCISES_SUCCESS',

    LOAD_EXERCISES_GROUP: 'LOAD_EXERCISES_GROUP',
    LOAD_EXERCISES_GROUP_SUCCESS: 'LOAD_EXERCISES_GROUP_SUCCESS',

    LOAD_EXERCISES_GROUPS_BY_IDS: 'LOAD_EXERCISES_GROUPS_BY_IDS',
    LOAD_EXERCISES_GROUPS_BY_IDS_SUCCESS: 'LOAD_EXERCISES_GROUPS_BY_IDS_SUCCESS',



    //dialogs
    LOAD_DIALOG: 'LOAD_DIALOG',
    LOAD_DIALOG_SUCCESS: 'LOAD_DIALOG_SUCCESS',
    DELETE_DIALOG: 'DELETE_DIALOG',

    LOAD_DIALOGS_BY_IDS: 'LOAD_DIALOGS_BY_IDS',
    LOAD_DIALOGS_BY_IDS_SUCCESS: 'LOAD_DIALOGS_BY_IDS_SUCCESS',

    LOAD_TEACHER_DIALOGS: 'LOAD_TEACHER_DIALOGS',
    LOAD_TEACHER_DIALOGS_SUCCESS: 'LOAD_TEACHER_DIALOGS_SUCCESS',

    LOAD_COMMUMITY_DIALOGS: 'LOAD_COMMUMITY_DIALOGS',
    LOAD_COMMUMITY_DIALOGS_SUCCESS: 'LOAD_COMMUMITY_DIALOGS_SUCCESS',


    //questionnaire
    LOAD_QUESTIONNAIRE: 'LOAD_QUESTIONNAIRE',
    LOAD_QUESTIONNAIRE_SUCCESS: 'LOAD_QUESTIONNAIRE_SUCCESS',


    //classes
    LOAD_PATIENT_CLASS: 'LOAD_PATIENT_CLASS',
    LOAD_PATIENT_CLASS_SUCCESS: 'LOAD_PATIENT_CLASS_SUCCESS',

    LOAD_TEACHER_CLASSES: 'LOAD_TEACHER_CLASSES',
    LOAD_TEACHER_CLASSES_SUCCESS: 'LOAD_TEACHER_CLASSES_SUCCESS',

    UPDATE_TEACHER_CLASS: 'UPDATE_TEACHER_CLASS',
    UPDATE_TEACHER_CLASS_SUCCESS: 'UPDATE_TEACHER_CLASS_SUCCESS',

    DELETE_TEACHER_CLASS: 'DELETE_TEACHER_CLASS',
    DELETE_TEACHER_CLASS_SUCCESS: 'DELETE_TEACHER_CLASS_SUCCESS',


    //courses
    LOAD_COURSE: 'LOAD_COURSE',
    LOAD_COURSE_SUCCESS: 'LOAD_COURSE_SUCCESS',
    LOAD_TEACHER_COURSES: 'LOAD_TEACHER_COURSES',
    LOAD_TEACHER_COURSES_SUCCESS: 'LOAD_TEACHER_COURSES_SUCCESS',
    LOAD_COMMUNITY_COURSES: 'LOAD_COMMUNITY_COURSES',
    LOAD_COMMUNITY_COURSES_SUCCESS: 'LOAD_COMMUNITY_COURSES_SUCCESS',





    //alert notifications
    SHOW_ALERT_NOTIFICATION: 'SHOW_ALERT_NOTIFICATION',
    HIDE_ALERT_NOTIFICATION: 'HIDE_ALERT_NOTIFICATION',


    //mail
    SHOW_MAIL_DIALOG: 'SHOW_MAIL_DIALOG',
    CLOSE_MAIL_DIALOG: 'CLOSE_MAIL_DIALOG',
    SEND_MAIL: 'SEND_MAIL',
    SEND_MAIL_SUCCESS: 'SEND_MAIL_SUCCESS',
    MAIL_DATA_CHANGE: 'MAIL_DATA_CHANGE',


    //notifications
    LOAD_NOTIFICATIONS: 'LOAD_NOTIFICATIONS',
    LOAD_NOTIFICATIONS_SUCCESS: 'LOAD_NOTIFICATIONS_SUCCESS',
    VIEW_NOTIFICATION: 'VIEW_NOTIFICATION',
    VIEW_NOTIFICATION_SUCCESS: 'VIEW_NOTIFICATION_SUCCESS',

    //comments
    LOAD_COMMENTS_FOR_RELATED_OBJECTS_LIST: 'LOAD_COMMENTS_FOR_RELATED_OBJECTS_LIST',
    LOAD_COMMENTS_FOR_RELATED_OBJECTS_LIST_SUCCESS: 'LOAD_COMMENTS_FOR_RELATED_OBJECTS_LIST_SUCCESS',
    MAKE_COMMENT: 'MAKE_COMMENT',
    MAKE_COMMENT_SUCCESS: 'MAKE_COMMENT_SUCCESS',



    //string constants
    IDIOMS_GROUP_ID: 'lN6Ow0ZOBY',
    VOCABULARY_GROUP_ID: 'LmohVyRlIQ'


};

module.exports = Constants;