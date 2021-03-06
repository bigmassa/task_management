import * as fromBillingFrequency from './reducers/billingfrequency';
import * as fromClient from './reducers/client';
import * as fromClientContact from './reducers/clientcontact';
import * as fromClientContactTag from './reducers/clientcontacttag';
import * as fromFilter from './reducers/filter';
import * as fromHttp from './reducers/http';
import * as fromJob from './reducers/job';
import * as fromJobFile from './reducers/jobfile';
import * as fromJobNote from './reducers/jobnote';
import * as fromJobRecurringCost from './reducers/jobrecurringcost';
import * as fromJobRelationship from './reducers/jobrelationship';
import * as fromJobStatus from './reducers/jobstatus';
import * as fromJobTiming from './reducers/jobtiming';
import * as fromJobType from './reducers/jobtype';
import * as fromMe from './reducers/me';
import * as fromPaymentOption from './reducers/paymentoption';
import * as fromPosition from './reducers/position';
import * as fromRecurringCostType from './reducers/recurringcosttype';
import * as fromRelationship from './reducers/relationship';
import * as fromTab from './reducers/tabs';
import * as fromTag from './reducers/tag';
import * as fromTask from './reducers/task';
import * as fromTaskAssignee from './reducers/taskassignee';
import * as fromTaskFile from './reducers/taskfile';
import * as fromTaskNote from './reducers/tasknote';
import * as fromTaskStatus from './reducers/taskstatus';
import * as fromTaskTag from './reducers/tasktag';
import * as fromTaskTiming from './reducers/tasktiming';
import * as fromTimeEntry from './reducers/timeentry';
import * as fromUser from './reducers/user';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';


export interface AppState {
    billing_frequencies: fromBillingFrequency.State;
    clients: fromClient.State;
    client_contacts: fromClientContact.State;
    client_contact_tags: fromClientContactTag.State;
    filters: fromFilter.State;
    http: fromHttp.State;
    jobs: fromJob.State;
    job_files: fromJobFile.State;
    job_notes: fromJobNote.State;
    job_recurring_costs: fromJobRecurringCost.State;
    job_relationships: fromJobRelationship.State;
    job_statuses: fromJobStatus.State;
    job_timings: fromJobTiming.State;
    job_types: fromJobType.State;
    me: fromMe.State;
    payment_options: fromPaymentOption.State;
    positions: fromPosition.State;
    recurring_cost_types: fromRecurringCostType.State;
    relationships: fromRelationship.State;
    tabs: fromTab.State;
    tags: fromTag.State;
    tasks: fromTask.State;
    task_assignees: fromTaskAssignee.State;
    task_files: fromTaskFile.State;
    task_notes: fromTaskNote.State;
    task_statuses: fromTaskStatus.State;
    task_tags: fromTaskTag.State;
    task_timings: fromTaskTiming.State;
    time_entries: fromTimeEntry.State;
    users: fromUser.State;
}

export const reducers: ActionReducerMap<AppState> = {
    billing_frequencies: fromBillingFrequency.reducer,
    clients: fromClient.reducer,
    client_contacts: fromClientContact.reducer,
    client_contact_tags: fromClientContactTag.reducer,
    filters: fromFilter.reducer,
    http: fromHttp.reducer,
    jobs: fromJob.reducer,
    job_files: fromJobFile.reducer,
    job_notes: fromJobNote.reducer,
    job_recurring_costs: fromJobRecurringCost.reducer,
    job_relationships: fromJobRelationship.reducer,
    job_statuses: fromJobStatus.reducer,
    job_timings: fromJobTiming.reducer,
    job_types: fromJobType.reducer,
    me: fromMe.reducer,
    payment_options: fromPaymentOption.reducer,
    positions: fromPosition.reducer,
    recurring_cost_types: fromRecurringCostType.reducer,
    relationships: fromRelationship.reducer,
    tabs: fromTab.reducer,
    tags: fromTag.reducer,
    tasks: fromTask.reducer,
    task_assignees: fromTaskAssignee.reducer,
    task_files: fromTaskFile.reducer,
    task_notes: fromTaskNote.reducer,
    task_statuses: fromTaskStatus.reducer,
    task_tags: fromTaskTag.reducer,
    task_timings: fromTaskTiming.reducer,
    time_entries: fromTimeEntry.reducer,
    users: fromUser.reducer
};

export const getBillingFrequencyState = createFeatureSelector<fromBillingFrequency.State>('billing_frequencies');
export const getClientState = createFeatureSelector<fromClient.State>('clients');
export const getClientContactState = createFeatureSelector<fromClientContact.State>('client_contacts');
export const getClientContactTagState = createFeatureSelector<fromClientContactTag.State>('client_contact_tags');
export const getFilterState = createFeatureSelector<fromFilter.State>('filters');
export const getHttpState = createFeatureSelector<fromHttp.IHttp>('http');
export const getJobState = createFeatureSelector<fromJob.State>('jobs');
export const getJobFileState = createFeatureSelector<fromJobFile.State>('job_files');
export const getJobNoteState = createFeatureSelector<fromJobNote.State>('job_notes');
export const getJobRecurringCostState = createFeatureSelector<fromJobRecurringCost.State>('job_recurring_costs');
export const getJobRelationshipState = createFeatureSelector<fromJobRelationship.State>('job_relationships');
export const getJobStatusState = createFeatureSelector<fromJobStatus.State>('job_statuses');
export const getJobTimingState = createFeatureSelector<fromJobTiming.State>('job_timings');
export const getJobTypeState = createFeatureSelector<fromJobType.State>('job_types');
export const getMeState = createFeatureSelector<fromMe.State>('me');
export const getPaymentOptionState = createFeatureSelector<fromPaymentOption.State>('payment_options');
export const getPositionState = createFeatureSelector<fromPosition.State>('positions');
export const getRecurringCostTypeState = createFeatureSelector<fromRecurringCostType.State>('recurring_cost_types');
export const getRelationshipState = createFeatureSelector<fromRelationship.State>('relationships');
export const getTabState = createFeatureSelector<fromTab.State>('tabs');
export const getTagState = createFeatureSelector<fromTag.State>('tags');
export const getTaskState = createFeatureSelector<fromTask.State>('tasks');
export const getTaskAssigneeState = createFeatureSelector<fromTaskAssignee.State>('task_assignees');
export const getTaskFileState = createFeatureSelector<fromTaskFile.State>('task_files');
export const getTaskNoteState = createFeatureSelector<fromTaskNote.State>('task_notes');
export const getTaskStatusState = createFeatureSelector<fromTaskStatus.State>('task_statuses');
export const getTaskTagState = createFeatureSelector<fromTaskTag.State>('task_tags');
export const getTaskTimingState = createFeatureSelector<fromTaskTiming.State>('task_timings');
export const getTimeEntryState = createFeatureSelector<fromTimeEntry.State>('time_entries');
export const getUserState = createFeatureSelector<fromUser.State>('users');
