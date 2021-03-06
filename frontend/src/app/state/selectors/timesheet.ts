import * as _ from 'lodash';
import * as moment from 'moment';
import { createSelector } from '@ngrx/store';
import { getTaskAssigneeState, getTimeEntryState, getClientState, getJobState } from './../state';
import { getTaskCollection, getTaskCollectionOpen } from './task';
import { valueOr } from '../../utils/generic';

export const getEventsForUser = (id: number) => createSelector(
    getTimeEntryState,
    getTaskCollection,
    (entries, tasks) => {
        const objs = _.filter(entries, ['user', id]);
        return _.map(objs, (obj) => {
            const _task = _.find(tasks, ['id', obj.task]);
            return {
                id: obj.id.toString(),
                start: new Date(obj.started_at),
                end: new Date(obj.ended_at),
                title: _.get(_task, '_job._client.name', '') + ' - ' +
                       _.get(_task, '_job.title', '') + ' - ' +
                       _.get(_task, 'title', ''),
                backgroundColor: _.get(_task, '_job.colour', ''),
                borderColor: _.get(_task, '_job.colour', ''),
                textColor: _.get(_task, '_job._text_colour', ''),
                allDay: false,
                extendedProps: {
                    id: obj.id,
                    task: obj.task,
                    signed_off: obj.signed_off
                }
            };
        });
    }
);

export const getTasksForTimeEntry = createSelector(
    getTaskCollectionOpen,
    (tasks) => _.filter(tasks, t => t._job._status.allow_new_timesheet_entries == true)
)

export const getTasksForUser = (id: number = null, searchTerms: string[] = []) => createSelector(
    getTasksForTimeEntry,
    getTaskAssigneeState,
    getClientState,
    getJobState,
    (tasks, assignees, clients, jobs) => {

        let objs = tasks;
        
        // apply filters (either search all or only show tasks im assigned to)
        if (searchTerms.length > 0) {
            objs = _.filter(objs, obj => {
                let found = true;
                _.each(searchTerms, (term) => {
                    if (!_.includes(valueOr(obj.title).toLowerCase(), term.toLowerCase()) &&
                        !_.includes(valueOr(obj._job.title).toLowerCase(), term.toLowerCase()) &&
                        !_.includes(valueOr(obj._job._client.name).toLowerCase(), term.toLowerCase())
                    ) {
                        found = false;
                    }
                });
                return found;
            });
        } else if (id) {
            let ids = _.map(_.filter(assignees, ['user', id]), 'task');
            objs = _.filter(objs, o => _.includes(ids, o.id));
        }

        // group the tasks by client
        const byClient = _.groupBy(objs, '_job.client');
        const byClientByJob = {};

        // then for each client group the tasks by job
        _.forEach(byClient, (tasks, key) => {
            const byJob = _.groupBy(tasks, 'job');
            byClientByJob[key] = {
                data: _.find(clients, ['id', +key]),
                jobs: _.transform(
                    byJob, (result, value, key) => result[key] = {
                        data: _.find(jobs, ['id', +key]),
                        tasks: value
                    }
                )
            }
        })

        return byClientByJob;
    }
)

export const getIsDaySignedOffRequired = (id: number, date: Date) => createSelector(
    getTimeEntryState,
    (entries) => {
        const dt = moment(date).format('YYYY-MM-DD');
        const objects = _.filter(
            entries,
            e => e.user === id
            && e.signed_off === false
            && _.startsWith(e.started_at, dt)
        );
        return objects.length > 0;
    }
)

export const getDailyTimeTotalForUser = (id: number, date: Date) => createSelector(
    getTimeEntryState,
    (entries) => {
        const dt = moment(date).format('YYYY-MM-DD');
        const forDay = _.filter(
            entries,
            e => e.user === id
            && _.startsWith(e.started_at, dt)
        );
        const durations: string[] = _.map(forDay, 'duration');
        const totalDurations = durations.slice(1).reduce((prev, cur) => moment.duration(cur).add(prev), moment.duration(durations[0]));
        return moment.utc(totalDurations.asMilliseconds()).format("HH:mm");
    }
)
