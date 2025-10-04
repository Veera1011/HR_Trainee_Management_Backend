
# HR Ledger Backend Project

## Project Overview

**HR Ledger** is a backend project designed to manage HR-related data and processes.  
It includes features for storing employee information, training records.  

- **Technology Stack:** Node.js, Express.js, MongoDB (or your choice of database)  
- **Project Type:** Backend API / Server  
- **Purpose:** To provide a robust backend for HR management applications  

---

## Folder Structure

```

HR_Ledger/
│
├── backend/
│   ├── index.js          # Entry point
│   ├── package.json       # Node.js dependencies
│   ├── routes/            # API routes
│   ├── models/            # Database schemas
│   ├── controllers/       # Business logic
│   └── .env
│
└── README.md              # Project documentation

````

---

## Git Workflow & Issue Encountered

While working on this project, an issue occurred during Git operations:

1. The local repository was initialized inside `HR Ledger`.  
2. The remote repository was incorrectly pointing to another project: `HR_Trainee_Management.git`.  
3. Running `git pull --rebase` caused the `backend/` folder to disappear.  
4. Pushing with `git push` said **“Everything up-to-date”** because Git tracked the wrong remote.  

---

## Steps to Recover Backend Files

### Step 1: Identify Safe Commit Using Git Reflog

```bash
git reflog
````

Sample output:

```
eeb062f HEAD@{0}: pull origin main --rebase
93e0bed HEAD@{2}: commit: Moved project files into Backend folder
0cb94cf HEAD@{9}: commit (initial): HR_Trainee Management backend
```

* Commit `93e0bed` contains the backend files.

---

### Step 2: Create a Temporary Branch from the Commit

```bash
git branch recover-backend 93e0bed
git checkout recover-backend
```

* The backend files will now appear in your working directory.

---

### Step 3: Copy Files to a Safe Location

* Save the `backend/` folder outside the repo (e.g., `D:\backup\backend`) to prevent data loss.

---

### Step 4: Set Correct Remote Repository

1. Create a new GitHub repository: **HR_Ledger** (empty, no README).
2. Update your local remote URL:

```bash
git remote set-url origin https://github.com/Veera1011/HR_Ledger.git
```

---

### Step 5: Restore Backend Files to Main Branch

```bash
git checkout main
```

* Copy the saved `backend/` folder back into the repository.

```bash
git add backend/
git commit -m "Restore backend files after accidental rebase"
```

---

### Step 6: Push to GitHub

```bash
git push -u origin main --force
```

* Your backend files are now safely stored in the new GitHub repository.

---

## Key Lessons Learned

1. Always verify the remote repository URL:

```bash
git remote -v
```

2. Avoid rebasing against a remote with unrelated history.
3. Use `git reflog` to recover lost commits.
4. Use temporary branches to safely restore lost files.

---

## Summary

This Markdown document serves as a complete reference for the **HR Ledger backend project**, including:

* Project overview and folder structure
* Git workflow issues encountered
* Step-by-step recovery process for lost backend files

This ensures that project files are safely versioned and recoverable for future development.

```




