import React from 'react';
import './profile.css';

class Profile extends React.Component {

  state = {
    name: this.props.user.name || '',
    age: this.props.user.age || '',
    pet: this.props.user.pet || '',  
  }

  onProfileUpdate = (data) => {
    console.log(data)
    fetch(`http://localhost:3000/profile/${this.props.user.id}`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ formInput: data })
    }).then(res => {
      this.props.toggleModal();
      this.props.loadUser({...this.props.user, ...data});
    }).catch(e => console.log(e))
  }

  onFormChange = event => {
    switch(event.target.name) {
      case 'name':
        this.setState({ name: event.target.value });
        break;
      case 'age':
        this.setState({ age: event.target.value });
        break;
      case 'pet':
        this.setState({ pet: event.target.value });
        break;
      default:
        return;
    }
  }

  render() {
    const { toggleModal, user } = this.props;
    const { name, age, pet } = this.state;
    return (
      <div className="profile-modal">
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
          <main className="pa4 black-80 w-80">
            <img
              src="http://tachyons.io/img/logo.jpg"
              className="h3 w3 dib" alt="avatar" />
            <h1>{name}</h1>
            <h4>{`Images Submitted: ${user.entries}`}</h4>
            <p>{`Member since: ${new Date(user.joined).toLocaleDateString()}`}</p>
            <hr />
            <label className="mt2 fw6" htmlFor="username">Name:</label>
            <input
              onChange={this.onFormChange}
              className="pa2 ba w-100"
              placeholder={name}
              type="text"
              name="name"
              id="name"
            />
            <label className="mt2 fw6" htmlFor="age">Age:</label>
            <input
              onChange={this.onFormChange}
              className="pa2 ba w-100"
              placeholder={age}
              type="text"
              name="age"
              id="age"
            />
            <label className="mt2 fw6" htmlFor="pet">Pet:</label>
            <input
              onChange={this.onFormChange}
              className="pa2 ba w-100"
              placeholder={pet}
              type="text"
              name="pet"
              id="pet"
            />        
            <div className="mt4" style={{ display: 'flex', justifyContent: 'space-evenly'}}>
              <button 
                className='b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20'
                onClick={() => this.onProfileUpdate({ name, age, pet })}
              >
                Save
              </button>
              <button 
                className='b pa2 grow pointer hover-white w-40 bg-light-red b--black-20'
                onClick={toggleModal}
              >
                Cancel
              </button>
            </div>
          </main>
          <div className="modal-close" onClick={toggleModal}>&times;</div>
        </article>
      </div>
    )
  }
}

export default Profile;