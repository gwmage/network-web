```diff
--- a/network-web/src/components/AdminMembers.jsx
+++ b/network-web/src/components/AdminMembers.jsx
@@ -49,11 +49,11 @@
           <tbody>
             {users.map(user => (
               <tr key={user.id}>
-                <td>{user.id}</td>
-                <td>{user.username}</td>
-                <td>{user.email}</td>
+                <td data-label="ID">{user.id}</td>
+                <td data-label="Username">{user.username}</td>
+                <td data-label="Email">{user.email}</td>
                 <td>
-                  <button onClick={() => handleEdit(user)}>Edit</button>
-                  <button onClick={() => handleDelete(user.id)}>Delete</button>
+                  <button className="action-button" onClick={() => handleEdit(user)}>Edit</button>
+                  <button className="action-button" onClick={() => handleDelete(user.id)}>Delete</button>
                 </td>
               </tr>
             ))}

```