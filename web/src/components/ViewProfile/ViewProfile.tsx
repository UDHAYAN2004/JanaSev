import { useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import profile from '../../assets/profile.jpg';
import { useUpdateProfileMutation } from './slice';

interface ProfileValues {
  id:string;
  name: string;
  userName: string;
  Gender: string;
  password: string;
  role: string;
  phone: string;
  email?: string;
  community?: string;
  state?: string;
}

const ViewProfile = () => {
  const appUser = useSelector((state: any) => state.appUser);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(profile);
  const[updateProfile]=useUpdateProfileMutation();
  const initialValues: ProfileValues = {
    id:appUser?.user?.id,
    name: appUser?.user?.name || "",
    userName: appUser?.user?.userName || "",
    Gender: appUser?.user?.Gender || "",
    password: "", // Empty for security
    role: appUser?.user?.role || "",
    phone: appUser?.user?.phone || "",
    email: appUser?.user?.email || "",
    community: appUser?.user?.community || "",
    state: appUser?.user?.state || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().min(3, "Name too short").required("Required"),
    userName: Yup.string().min(3, "Username too short").required("Required"),
    Gender: Yup.string().required("Required"),
    password: Yup.string().min(6, "Minimum 6 characters"),
    role: Yup.string().required("Required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Enter a valid 10-digit phone number")
      .required("Required"),
    email: Yup.string().email("Invalid email"),
    community: Yup.string(),
    state: Yup.string(),
  });

  const handleSubmit = async (values: ProfileValues, { setSubmitting }: any) => {
    try {
      // Add your update profile API call here
     const {isUpdate,message}= await updateProfile(values as unknown as FormData).unwrap();
        if(isUpdate)
          alert(message);
        setIsEditing(false);
    } catch (error) {
      console.log('Update error:', error);
      alert(JSON.stringify((error.data.errors[0].message).toString()));
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-green-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
          {/* Header Section */}
          <div className="bg-linear-to-r from-blue-600 to-green-600 p-6 text-white">
            <h1 className="text-3xl font-bold">Profile Settings</h1>
            <p className="text-blue-100 mt-2">Manage your personal information</p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ isSubmitting, values }) => (
              <Form>
                <div className="p-8">
                  {/* Profile Image and Basic Info */}
                  <div className="flex flex-col lg:flex-row items-center justify-between mb-8 pb-8 border-b border-gray-200">
                    <div className="flex items-center gap-6 mb-6 lg:mb-0">
                      <div className="relative">
                        <img 
                          src={profileImage} 
                          alt="profile" 
                          className="w-24 h-24 rounded-full shadow-2xl border-4 border-white"
                        />
                        {isEditing && (
                          <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full cursor-pointer hover:bg-blue-600 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={handleImageChange}
                            />
                          </label>
                        )}
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                          {isEditing ? (
                            <Field
                              name="name"
                              className="text-2xl font-bold bg-transparent border-b-2 border-blue-500 focus:outline-none"
                            />
                          ) : (
                            values.name || "Your Name"
                          )}
                        </h1>
                        <h4 className="text-gray-600 mt-1">{values.email}</h4>
                        {!isEditing && (
                          <p className="text-sm text-gray-500 mt-1">@{values.userName}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      {!isEditing ? (
                        <button
                          type="button"
                          onClick={() => setIsEditing(true)}
                          className="bg-linear-to-r from-blue-600 to-green-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                          Edit Profile
                        </button>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="bg-gray-500 text-white font-semibold py-3 px-6 rounded-xl hover:bg-gray-600 transition-all duration-300 shadow-lg"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-linear-to-r from-blue-600 to-green-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
                          >
                            {isSubmitting ? "Saving..." : "Save Changes"}
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Profile Form */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                      {/* Full Name */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Full Name
                        </label>
                        {isEditing ? (
                          <>
                            <Field
                              name="name"
                              type="text"
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                              placeholder="Enter your full name"
                            />
                            <ErrorMessage
                              name="name"
                              component="div"
                              className="text-red-500 text-sm mt-2"
                            />
                          </>
                        ) : (
                          <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-700">
                            {values.name || "Your Full Name"}
                          </div>
                        )}
                      </div>

                      {/* Username */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Username
                        </label>
                        {isEditing ? (
                          <>
                            <Field
                              name="userName"
                              type="text"
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                              placeholder="Enter your username"
                            />
                            <ErrorMessage
                              name="userName"
                              component="div"
                              className="text-red-500 text-sm mt-2"
                            />
                          </>
                        ) : (
                          <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-700">
                            {values.userName || "Your Username"}
                          </div>
                        )}
                      </div>

                      {/* Gender */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Gender
                        </label>
                        {isEditing ? (
                          <>
                            <Field
                              as="select"
                              name="Gender"
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                            >
                              <option value="">Select Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="TransGender">TransGender</option>
                            </Field>
                            <ErrorMessage
                              name="Gender"
                              component="div"
                              className="text-red-500 text-sm mt-2"
                            />
                          </>
                        ) : (
                          <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-700">
                            {values.Gender || "Your Gender"}
                          </div>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Email
                        </label>
                        {isEditing ? (
                          <>
                            <Field
                              name="email"
                              type="email"
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                              placeholder="Enter your email"
                            />
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="text-red-500 text-sm mt-2"
                            />
                          </>
                        ) : (
                          <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-700">
                            {values.email || "Your Email"}
                          </div>
                        )}
                      </div>
                      
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                     
                      

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Phone Number
                        </label>
                        {isEditing ? (
                          <>
                            <Field
                              name="phone"
                              type="tel"
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                              placeholder="Enter your phone number"
                            />
                            <ErrorMessage
                              name="phone"
                              component="div"
                              className="text-red-500 text-sm mt-2"
                            />
                          </>
                        ) : (
                          <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-700">
                            {values.phone || "Your Phone Number"}
                          </div>
                        )}
                      </div>

                      {/* Community */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Community
                        </label>
                        {isEditing ? (
                          <>
                            <Field
                              as="select"
                              name="community"
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                            >
                              <option value="">Select Community</option>
                              <option value="BC">BC</option>
                              <option value="MBC">MBC</option>
                              <option value="SC/ST">SC/ST</option>
                              <option value="OC">OC</option>
                              <option value="Other">Other</option>
                            </Field>
                            <ErrorMessage
                              name="community"
                              component="div"
                              className="text-red-500 text-sm mt-2"
                            />
                          </>
                        ) : (
                          <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-700">
                            {values.community || "Your Community"}
                          </div>
                        )}
                      </div>

                      {/* State */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          State
                        </label>
                        {isEditing ? (
                          <>
                            <Field
                              name="state"
                              type="text"
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                              placeholder="Enter your state"
                            />
                            <ErrorMessage
                              name="state"
                              component="div"
                              className="text-red-500 text-sm mt-2"
                            />
                          </>
                        ) : (
                          <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-700">
                            {values.state || "Your State"}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Password Section - Only in Edit Mode */}
                  
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;