import * as _ from 'lodash';
import { createSelector } from '@ngrx/store';
import { getMeState, getTaskAssigneeState } from '../state';
import { getTaskCollectionOpen } from './task';

export const getTasksForTaskBoardForUser = createSelector(
    getTaskCollectionOpen,
    getTaskAssigneeState,
    getMeState,
    (tasks, assignees, me) => {
        let objs = tasks;
        
        // only tasks assigned to user
        let ids = _.map(_.filter(assignees, ['user', me.id]), 'task');
        objs = _.filter(objs, o => _.includes(ids, o.id));

        const mappedObjs = _.map(objs, o => _.assign({}, o, {
            _assignees: _.filter(assignees, ['task', o.id])
        }))

        return _.orderBy(mappedObjs, ['target_date'], ['asc']);;
    }
)