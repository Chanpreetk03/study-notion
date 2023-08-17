import React from "react";

const ContactUsForm = () =>{
    return(
        <form onSubmit={handleSubmit(submitContactForm)}>
            <div>

            {/* firstname */}
            <div className="flex flex-col">
                <label htmlFor="firstname">First Name</label>
                <input 
                    type="text"
                    name="firstname"
                    id="firstname"
                    placeholder="Enter First Name"
                    {...register(
                        'firstname',{required:true}
                    )}
                    />
                    {
                        errors.firstname && {
                            <span>
                                Please enter your name
                            </span>
                        }
                    }
            </div>

            </div>
        </form>
    )
}

export default ContactUsForm