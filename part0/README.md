### Exercise 0.4
```mermaid
sequenceDiagram
    participant Browser
    participant Server

    Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    Note over Server: The server responds with HTTP status code 302(redirect url)
    Server-->>Browser: redirect to https://studies.cs.helsinki.fi/exampleapp/notes

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    Server-->>Browser: Returns HTML,CSS and JS Files with extra requests :-:

    Note over Browser: Browser starts requesting json data from server

    Browser->>Server : GET https://studies.cs.helsinki.fi/exampleapp/data.json
    Server-->>Browser: Return jsos data

    Note over Browser: Browser renders data
```

### Exercise 0.5

```mermaid
sequenceDiagram
    participant Browser
    participant Server

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    Server-->>Browser: The server Responds with HTML Code

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    Server-->>Browser: Server Returns CSS

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    Server-->>Browser: Server Javascript

    Note over Browser: The browser executes js file which request json data

    Browser->>Server: https://studies.cs.helsinki.fi/exampleapp/data.json
    Server-->>Browser: Server sends back json data

    Note over Browser: The browser renders the data
```

### Exercise 0.6

```mermaid
sequenceDiagram
    participant Browser
    participant Server

    Note over Browser: When submit button is clicked, it creates new note and adds it to notes list, rerenders it adn sends the new note to server
    
    Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Server-->>Browser: The Server save the data and returns status code 201 

    Note over Browser: Browser does not reload
```