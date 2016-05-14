import {Router} from 'express';
//import passport from 'passport';
import * as ProjectController from '../controllers/project.controller';

// var multer = require('multer');
// var upload = multer({dest: 'uploads/'})

const projectRouter = new Router();

// projectRouter.get('/getFileThumbnails/:projectId/:imgId', ProjectController.getFileThumbnails);
// projectRouter.get('/getFileImage/:projectId/:imgId', ProjectController.getFileImage);
// projectRouter.get('/getProjectAudioFileByAudioFileId',ProjectController.getProjectAudioFileByAudioFileId);
// projectRouter.use(passport.authenticate('jwt', { session: false}));//经过passport-jwt中间件

// projectRouter.get('/getProjectById/:id', ProjectController.getProjectById);
// projectRouter.get('/getProjectByName', ProjectController.getProjectByName);
// projectRouter.post('/createProjectName', ProjectController.createProjectName);
// projectRouter.post('/createProjectCategories', ProjectController.createProjectCategories);
// projectRouter.post('/createProjectChannels', ProjectController.createProjectChannels);
// projectRouter.post('/createProjectAudioFile', upload.single('file'), ProjectController.createProjectAudioFile);
// projectRouter.post('/createProjectImageFiles', upload.array('file'), ProjectController.createProjectImageFiles);
// projectRouter.post('/setProjectStep',ProjectController.setProjectStep);
projectRouter.get('/getProjectsByUserId/:userId',ProjectController.getProjectsByUserId);

export default projectRouter
