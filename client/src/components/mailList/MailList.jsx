import './mailList.css'

const MailList = () => {
  return (
    <div className='mailList'>
      <h1 className='mailListTitle'>Save time, save money!</h1>
      <span className='mailListDescription'>Sign up and we'll send the best deals to you</span>
      <div className='mailListInputContainer'>
        <input type='text' placeholder='Your Email' />
        <button>Subscribe</button>
      </div>
    </div>
  )
}

export default MailList
