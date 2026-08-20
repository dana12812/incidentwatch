
# IncidentWatch

> A simple web application for tracking incidents and suspicious activity.

## About

IncidentWatch is a simple web application for tracking incidents and suspicious activities.

Users can create and manage records. When an activity happens, the system creates an incident linked to the user and record. Administrators can view incidents, flag suspicious ones, and review them.

The system helps keep incident information organized and makes it easier to track what happened, who was involved, and which record was affected.

I built this project to practice modeling real relationships between users, the data they access, and the audit trail that access leaves behind — a pattern used across many real security and compliance tools.


## User Stories

### Users
- As a user, I want to sign up and log in.
- As an admin, I want to manage users.

### Records
- As a user, I want to create records.
- As a user, I want to view my records.
- As a user, I want to edit and delete my records.

### Incidents
- As a user, I want my activities to be recorded as incidents.
- As an admin, I want to view all incidents.
- As an admin, I want to see the user and record linked to an incident.

### Reviews
- As an admin, I want to flag suspicious incidents.
- As an admin, I want to review flagged incidents.
- As an admin, I want to see who reviewed an incident.

## ERD

![IncidentWatch incident review](https://www.image2url.com/r2/default/images/1787217367524-d8ae0268-64ce-4dbc-bfe9-b9ceb5d8fb5f.png)

[View the ERD on Excalidraw](https://excalidraw.com/#json=h00g3UQoNNhnlQ2aRz4Yc,dChq2t7MsdE0q_NWJ6ReAw)

### IncidentWatch ERD 

**Why these models?**
- **User** → stores system users and admins.
- **Record** → stores the sensitive files/items being accessed.
- **Incident** → stores each important or suspicious activity.
- **FlagReview** → stores the admin's review of a flagged incident.

**Why use references?**
We use references to connect models without repeating the same data. For example, `ownerId` connects a Record to its User.

**Why use enums?**
Enums limit a field to specific values. Example:
- `role`: `user` or `admin`
- `sensitivityLevel`: `low`, `medium`, `high`
- `action`: `view`, `edit`, `export`
- `status`: `pending`, `cleared`, `escalated`

**Relationships**
- One **User** → many **Records** — a user can own multiple records.
- One **User** → many **Incidents** — a user can have multiple activities/incidents.
- One **Record** → many **Incidents** — a record can be accessed many times.
- One **Incident** → one **FlagReview** — each flagged incident is reviewed once.
- One **Admin** → many **FlagReviews** — an admin can review many incidents.

**Simple system flow**

```
User → accesses Record → Incident is created → if suspicious → Admin creates FlagReview
```

## Wireframes

![IncidentWatch dashboard](https://www.image2url.com/r2/default/images/1787217331138-f04e469e-ad2c-41b1-b84a-f769110e47bd.png)

[View the wireframes on Excalidraw](https://excalidraw.com/#json=AUKIPmlKrP68rF9nO14xY,J8MK6JbU6qrHuVqRra6vnA)

