# Coding Competition Platform: Unit Testing
Unit testing philosophy for this project. Ensures that unit tests hit all goals and requirements. This serves as a mere checklist to ensure that every test written for any application component aligns with all of the needs.

## CRUD Routes
- **Basic operation** - verify that the code works when provided average, expected inputs/outputs

- **CREATE** (insert/add)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Successful creation: Verify that new data can be successfully inserted into the database\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Duplicate data: Test how the system handles attempts to insert duplicate data\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Validation errors: Test that invalid data (e.g., missing required fields or fields with incorrect types) is handled properly

- **READ** (select/get)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Retrieve existing data: Test that you can retrieve an entry that exists in the databaseValidation errors: Test that invalid data (e.g., missing required fields or fields with incorrect types) is rejected\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Handle non-existing data: Test that the system correctly handles cases where the data doesn’t exist\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Query filtering: Test filtering conditions to ensure that only the correct subset of data is returned\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Pagination and sorting: If applicable, test pagination and sorting logic to make sure they work as expected

- **UPDATE** (modify/update)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Successful update: Verify that existing data can be updated and that the changes persist in the database\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Non-existing data: Test how the system handles updating records that don’t exist\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Partial updates: If your system supports partial updates, ensure that only the specified fields are updated, leaving others unchanged\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Validation errors: Ensure that invalid updates

- **DELETE** (remove/delete)\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Successful deletion: Test that an existing entry can be successfully deleted from the database\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Non-existing data: Test how the system behaves when attempting to delete something that doesn’t exist\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Cascading deletes: If there are foreign key relationships, ensure that deleting a record doesn’t lead to unintended deletions or that cascading deletes work as expected