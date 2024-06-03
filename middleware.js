function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// app.get('/home', isLoggedIn, async (req, res) => {
//     try {
//         const user = await User.findById(req.user._id)
//             .populate('action')
//             .populate('horror')
//             .populate('drama')
//             .populate('comedy')
//             .populate('fantasy');
//         res.render('home', { user });
//     } catch (err) {
//         console.error('Error fetching user data:', err);
//         res.status(500).send('Internal Server Error');
//     }
// });

module.exports={isLoggedIn}













// // module.exports = router;