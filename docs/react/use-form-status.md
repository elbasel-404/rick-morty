React
v19.2
Search
Ctrl
K
Learn
Reference
Community
Blog

react@19.2
Overview
Hooks
Components
APIs
react-dom@19.2
Hooks
useFormStatus
Components
APIs
Client APIs
Server APIs
Static APIs
React Compiler
Configuration
Directives
Compiling Libraries
React DevTools
React Performance tracks
eslint-plugin-react-hooks
Lints
Rules of React
Overview
React Server Components
Server Components
Server Functions
Directives
Legacy APIs
Legacy React APIs
Is this page useful?

API Reference
Hooks
useFormStatus
useFormStatus is a Hook that gives you status information of the last form submission.

const { pending, data, method, action } = useFormStatus();
Reference
useFormStatus()
Usage
Display a pending state during form submission
Read the form data being submitted
Troubleshooting
status.pending is never true
Reference
useFormStatus()
The useFormStatus Hook provides status information of the last form submission.

import { useFormStatus } from "react-dom";
import action from './actions';

function Submit() {
const status = useFormStatus();
return <button disabled={status.pending}>Submit</button>
}

export default function App() {
return (
<form action={action}>
<Submit />
</form>
);
}
To get status information, the Submit component must be rendered within a <form>. The Hook returns information like the pending property which tells you if the form is actively submitting.

In the above example, Submit uses this information to disable <button> presses while the form is submitting.

See more examples below.

Parameters
useFormStatus does not take any parameters.

Returns
A status object with the following properties:

pending: A boolean. If true, this means the parent <form> is pending submission. Otherwise, false.

data: An object implementing the FormData interface that contains the data the parent <form> is submitting. If there is no active submission or no parent <form>, it will be null.

method: A string value of either 'get' or 'post'. This represents whether the parent <form> is submitting with either a GET or POST HTTP method. By default, a <form> will use the GET method and can be specified by the method property.

action: A reference to the function passed to the action prop on the parent <form>. If there is no parent <form>, the property is null. If there is a URI value provided to the action prop, or no action prop specified, status.action will be null.
Caveats
The useFormStatus Hook must be called from a component that is rendered inside a <form>.
useFormStatus will only return status information for a parent <form>. It will not return status information for any <form> rendered in that same component or children components.
Usage
Display a pending state during form submission
To display a pending state while a form is submitting, you can call the useFormStatus Hook in a component rendered in a <form> and read the pending property returned.

Here, we use the pending property to indicate the form is submitting.

App.js

Reload

Clear

Fork
import { useFormStatus } from "react-dom";
import { submitForm } from "./actions.js";

function Submit() {
const { pending } = useFormStatus();
return (
<button type="submit" disabled={pending}>
{pending ? "Submitting..." : "Submit"}
</button>
);
}

function Form({ action }) {
return (
<form action={action}>
<Submit />
</form>
);
}

export default function App() {
return <Form action={submitForm} />;
}

Show more
Pitfall
useFormStatus will not return status information for a <form> rendered in the same component.
The useFormStatus Hook only returns status information for a parent <form> and not for any <form> rendered in the same component calling the Hook, or child components.

function Form() {
// 🚩 `pending` will never be true
// useFormStatus does not track the form rendered in this component
const { pending } = useFormStatus();
return <form action={submit}></form>;
}
Instead call useFormStatus from inside a component that is located inside <form>.

function Submit() {
// ✅ `pending` will be derived from the form that wraps the Submit component
const { pending } = useFormStatus();
return <button disabled={pending}>...</button>;
}

function Form() {
// This is the <form> `useFormStatus` tracks
return (
<form action={submit}>
<Submit />
</form>
);
}
Read the form data being submitted
You can use the data property of the status information returned from useFormStatus to display what data is being submitted by the user.

Here, we have a form where users can request a username. We can use useFormStatus to display a temporary status message confirming what username they have requested.

UsernameForm.js
App.js

Reload

Clear

Fork
import {useState, useMemo, useRef} from 'react';
import {useFormStatus} from 'react-dom';

export default function UsernameForm() {
const {pending, data} = useFormStatus();

return (
<div>
<h3>Request a Username: </h3>
<input type="text" name="username" disabled={pending}/>
<button type="submit" disabled={pending}>
Submit
</button>
<br />
<p>{data ? `Requesting ${data?.get("username")}...`: ''}</p>
</div>
);
}

Show more
Troubleshooting
status.pending is never true
useFormStatus will only return status information for a parent <form>.

If the component that calls useFormStatus is not nested in a <form>, status.pending will always return false. Verify useFormStatus is called in a component that is a child of a <form> element.

useFormStatus will not track the status of a <form> rendered in the same component. See Pitfall for more details.

Previous
Hooks
Next
Components
Copyright © Meta Platforms, Inc
uwu?
Learn React
Quick Start
Installation
Describing the UI
Adding Interactivity
Managing State
Escape Hatches
API Reference
React APIs
React DOM APIs
Community
Code of Conduct
Meet the Team
Docs Contributors
Acknowledgements
More
Blog
React Native
Privacy
Terms
useFormStatus – React
