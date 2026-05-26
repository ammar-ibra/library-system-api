1. List actors — Who uses the system?
Member
Librarian
Manager
Collection
Users
Materials (materialType: book | magazine | cd | map)
Loans
Reservations
Reviews


2. List main actions — What do they do?
Show Materials
Show Member Profile
Make Loan
Make Reservation
Return Material
Make Feedback / Rate
Manage Materials
Manage Members

3. Find the nouns — Each important noun often becomes a collection
User
Material
Loan
Reservation
Review

4. Draw relationships
User (1) -> (1) Member Profile
User (1) -> (1) Librarian Profile
User (1) -> (1) Manager Profile
Loan (M) -> (1) User (Member)
Loan (M) -> (1) Material
Loan (M) -> (1) User (Librarian)
Reservation (M) -> (1) User (Member)
Reservation (M) -> (1) Material
Review (M) -> (1) User (Member)
Review (M) -> (1) Material

5. Name fields by role

Users { 
  name, email, phone, password, registeredAt,
  role [member, librarian, manager],
  ?address, ?dateOfBirth, ?membershipNumber, ?responsibleDepartment
  }

Materials { 
  title, author, publisher, publicationYear,
  category [fiction, science, history, technology],
  totalCopies, availableCopies, coverImageUrl,
  materialType [book, magazine, cd, map],
  ?ISBN, ?issueNumber, ?month, ?year
  }

Loans{
  status [active, returned, overdue, cancelled],
  memberId (REF: Users), librarianId (REF: Users), materialId (REF: Materials), loanDate, dueDate,
  ?actualReturnDate, finePerDay, totalFineAmount,
  paymentStatus [paid, unpaid]
  }

Reservations {
  status [pending, fulfilled, cancelled, expired],
  materialId (REF: Materials), memberId (REF: Users),
  reservedAt, queuePriority, notifiedWhenAvailable, autoCancelAfter
  }

Reviews { stars, ?reviewText, memberId (REF: Users), materialId (REF: Materials) }