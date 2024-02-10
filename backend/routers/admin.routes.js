// Admin routes
router.post('/admin/classes', isAdmin, (req, res) => createClass(req, res));
router.put('/admin/classes/:date/:time', isAdmin, (req, res) => updateClass(req, res));
router.get('/admin/classes', isAdmin, (req, res) => getAllClasses(req, res)); // Added callback function
router.delete('/admin/classes/:date/:time', isAdmin, (req, res) => deleteClass(req, res));
