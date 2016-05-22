import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';
import App from './containers/App';
import Home from './view/Home';
import Login from './view/Login';
import Dashboard from './view/Dashboard';
import Projects from './view/Projects';
import CreateProject from './view/CreateProject';
import SelectCategory from './view/SelectCategory';
import UploadAudio from './view/UploadAudio';
import UploadImages from './view/UploadImages';
import EditAudioFile from './view/EditAudioFile';
import NotFound from './view/NotFound';
import ProjectPreview from './view/ProjectPreviewPage';
import ProjectRelease from './view/ProjectReleasePage';

export default(
    <Route path='/' component={App}>
        <IndexRoute component={Home}/>
        <Route path='ProjectRelease/:projectId' component={ProjectRelease}/>
        <Route path='login' component={Login}/>
        <Route path='dashboard' component={Dashboard}>
            <Redirect from="projects/:userId" to="projects/:userId"/>
        </Route>
        <Route component={Dashboard}>
            <Route path='projects/:userId' component={Projects}/>
            <Route path='create/:userId' component={CreateProject}>
                <Redirect from="selectCategory" to="selectCategory"/>
            </Route>
            <Route path='ProjectPreview' component={ProjectPreview}/>
            <Route component={CreateProject}>
                <Route path='selectCategory' component={SelectCategory}/>
                <Route path='uploadAudio' component={UploadAudio}/>
                <Route path='uploadImages' component={UploadImages}/>
                <Route path='editAudioFile' component={EditAudioFile}/>
            </Route>
        </Route>
        <Route path='*' component={NotFound}/>
    </Route>
);