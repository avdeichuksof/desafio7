import express from 'express'
import passport from 'passport'
import SessionController from '../controllers/sessionController.js'

const sessionController = new SessionController()
const router = new express.Router()

function auth(req, res, next){
    (req.session.admin == true) 
        ? next()
        : res.send('An error ocurred or you are not an admin ')
}

router.post('/register', passport.authenticate('register', {failureRedirect: '/auth/failedregistration'}), sessionController.register)
router.get('/failedregistration', sessionController.failedRegister)

router.post('/login', passport.authenticate('login', {failureRedirect: '/auth/failedlogin'}), sessionController.login)
router.get('/failedlogin', sessionController.failLogin)

router.get('/github', passport.authenticate('github', {scope: ['user: email']}))
router.get('/github/callback', passport.authenticate('github', {failureRedirect: '/login'}), (req, res) => {
    req.session.user = req.user
    res.redirect('/home')
})

router.get('/logout', sessionController.logout)
router.get('/private', auth, sessionController.isAdmin)
router.get('/current', sessionController.getCurrentSession)

export default router