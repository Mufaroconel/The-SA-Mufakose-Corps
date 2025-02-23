import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Plus, Image as ImageIcon } from 'lucide-react';
import { brigadeData } from '../../data/brigades';
import { brigadeMembersData, BrigadeMember } from '../../data/brigadeMembers';

interface EventFormData {
  title: string;
  dayPattern: string;
  customDays?: string; 
  time: string;
  location: string;
  type: 'service' | 'study' | 'fellowship' | 'other';
}

interface GalleryFormData {
  image: File | null;
  description: string;
}

interface Brigade {
  id: string;
  name: string;
  description: string;
  image: string;
  leader: string;
  meetingTime: string;
  members: number;
  posts: BrigadePost[];
}

interface BrigadePost {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
}

interface BrigadeFormData {
  id: string;
  updateType: 'info' | 'post';
  image?: string;
  leader?: string;
  meetingTime?: string;
  post?: {
    title: string;
    content: string;
    date: string;
    author: string;
  };
}

interface MemberFormData {
  action: 'add' | 'update';
  brigadeId: string;
  memberId?: string;
  name: string;
  role: string;
  joinDate: string;
  status: 'active' | 'inactive';
  contact?: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    posts: [],
    events: [],
  });
  const [showEventForm, setShowEventForm] = useState(false);
  const [eventFormData, setEventFormData] = useState<EventFormData>({
    title: '',
    dayPattern: 'weekly',
    customDays: '',
    time: '09:00',
    location: '',
    type: 'service'
  });
  const [showGalleryForm, setShowGalleryForm] = useState(false);
  const [galleryFormData, setGalleryFormData] = useState<GalleryFormData>({
    image: null,
    description: ''
  });
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [showBrigadeForm, setShowBrigadeForm] = useState(false);
  const [brigadeFormData, setBrigadeFormData] = useState<BrigadeFormData>({
    id: '',
    updateType: 'info',
    image: '',
    leader: '',
    meetingTime: '',
    post: {
      title: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
      author: ''
    }
  });
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [memberFormData, setMemberFormData] = useState<MemberFormData>({
    action: 'add',
    brigadeId: '',
    name: '',
    role: '',
    joinDate: new Date().toISOString().split('T')[0],
    status: 'active'
  });
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const dayPatternOptions = [
    { value: 'weekly', label: 'Every Week' },
    { value: 'monday', label: 'Every Monday' },
    { value: 'tuesday', label: 'Every Tuesday' },
    { value: 'wednesday', label: 'Every Wednesday' },
    { value: 'thursday', label: 'Every Thursday' },
    { value: 'friday', label: 'Every Friday' },
    { value: 'saturday', label: 'Every Saturday' },
    { value: 'sunday', label: 'Every Sunday' },
    { value: 'custom', label: 'Custom Pattern' }
  ];

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Fetch dashboard data
    const fetchData = async () => {
      const [postsRes, eventsRes] = await Promise.all([
        fetch('/api/posts'),
        fetch('/api/events'),
      ]);

      const [posts, events] = await Promise.all([
        postsRes.json(),
        eventsRes.json(),
      ]);

      setData({ posts, events });
    };

    fetchData();
  }, [navigate]);

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify(eventFormData)
      });
      
      if (response.ok) {
        setShowEventForm(false);
        // Refresh events data
        // You might want to add a function to refresh just the events
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setGalleryFormData({ ...galleryFormData, image: file });
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleGallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!galleryFormData.image) return;

    const formData = new FormData();
    formData.append('image', galleryFormData.image);
    formData.append('description', galleryFormData.description);

    try {
      const response = await fetch('/api/gallery', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: formData
      });

      if (response.ok) {
        setShowGalleryForm(false);
        setGalleryFormData({ image: null, description: '' });
        setPreviewUrl('');
        // Refresh gallery data
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleBrigadeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = brigadeFormData.updateType === 'info' 
        ? `/api/brigades/${brigadeFormData.id}`
        : `/api/brigades/${brigadeFormData.id}/posts`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify(brigadeFormData)
      });

      if (response.ok) {
        setShowBrigadeForm(false);
        // Reset form data
        setBrigadeFormData({
          id: '',
          updateType: 'info',
          image: '',
          leader: '',
          meetingTime: '',
          post: {
            title: '',
            content: '',
            date: new Date().toISOString().split('T')[0],
            author: ''
          }
        });
      }
    } catch (error) {
      console.error('Error updating brigade:', error);
    }
  };

  const handleMemberSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Update these endpoints to match your Vite server
      const baseUrl = import.meta.env.VITE_API_URL || '';  // Add this to your .env file
      const endpoint = memberFormData.action === 'add' 
        ? `${baseUrl}/api/members/add` 
        : `${baseUrl}/api/members/${memberFormData.memberId}/update`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify(memberFormData)
      });

      if (response.ok) {
        setShowMemberForm(false);
        setNotification({
          type: 'success',
          message: `Member ${memberFormData.action === 'add' ? 'added' : 'updated'} successfully`
        });
        // Reset form
        setMemberFormData({
          action: 'add',
          brigadeId: '',
          name: '',
          role: '',
          joinDate: new Date().toISOString().split('T')[0],
          status: 'active'
        });
        setTimeout(() => setNotification(null), 3000);
      } else {
        throw new Error('Failed to save member');
      }
    } catch (error) {
      console.error('Error managing member:', error);
      setNotification({
        type: 'error',
        message: 'Failed to save member. Please try again.'
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="min-h-screen bg-red-50">
      {/* Hero Section */}
      <motion.div
        className="relative h-96 bg-gradient-to-r from-red-700 to-red-900 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center">
          <motion.h1 
            className="text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Admin Dashboard
          </motion.h1>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Upcoming Events Tile */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Upcoming Events</h2>
              <button
                onClick={() => setShowEventForm(true)}
                className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
            <div className="space-y-4">
              {data.events.map((event: any, index: number) => (
                <div key={index} className="p-3 bg-red-50 rounded-lg">
                  <div className="font-semibold">{event.title}</div>
                  <div className="text-sm text-gray-600">{event.date} at {event.time}</div>
                  <div className="text-sm text-gray-600">{event.location}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery Management Tile */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Gallery Management</h2>
              <button
                onClick={() => setShowGalleryForm(true)}
                className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
            <div className="space-y-4">
              {/* Display recent uploads here */}
            </div>
          </div>

          {/* Brigade Management Tile */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Brigade Management</h2>
              <button
                onClick={() => setShowBrigadeForm(true)}
                className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
            <div className="space-y-4">
              {/* You can add a list of recent updates here */}
            </div>
          </div>

          {/* Add the Brigade Members Tile */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Brigade Members</h2>
              <button
                onClick={() => {
                  setMemberFormData({
                    action: 'add',
                    brigadeId: '',
                    name: '',
                    role: '',
                    joinDate: new Date().toISOString().split('T')[0],
                    status: 'active'
                  });
                  setShowMemberForm(true);
                }}
                className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
            <div className="text-sm text-gray-600">
              Manage brigade members and their roles
            </div>
          </div>
        </div>
      </div>

      {/* Event Form Modal */}
      {showEventForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Add New Event</h2>
            <form onSubmit={handleEventSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={eventFormData.title}
                  onChange={(e) => setEventFormData({...eventFormData, title: e.target.value})}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Day Pattern</label>
                <select
                  value={eventFormData.dayPattern}
                  onChange={(e) => setEventFormData({...eventFormData, dayPattern: e.target.value})}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                >
                  {dayPatternOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Show custom days input if custom pattern is selected */}
              {eventFormData.dayPattern === 'custom' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Custom Days Pattern
                  </label>
                  <input
                    type="text"
                    value={eventFormData.customDays}
                    onChange={(e) => setEventFormData({...eventFormData, customDays: e.target.value})}
                    placeholder="e.g., First Sunday of every month"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">Time</label>
                <input
                  type="time"
                  value={eventFormData.time}
                  onChange={(e) => setEventFormData({...eventFormData, time: e.target.value})}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
                <p className="mt-1 text-sm text-gray-500">
                  Click to select time (24-hour format)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  value={eventFormData.location}
                  onChange={(e) => setEventFormData({...eventFormData, location: e.target.value})}
                  placeholder="Fellowship Hall"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  value={eventFormData.type}
                  onChange={(e) => setEventFormData({...eventFormData, type: e.target.value as EventFormData['type']})}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                >
                  <option value="service">Service</option>
                  <option value="study">Study</option>
                  <option value="fellowship">Fellowship</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowEventForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Add Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gallery Upload Modal */}
      {showGalleryForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Upload Photo</h2>
            <form onSubmit={handleGallerySubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Photo</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    {previewUrl ? (
                      <div className="mb-4">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="mx-auto h-32 w-auto object-cover rounded"
                        />
                      </div>
                    ) : (
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                    )}
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleImageChange}
                          required
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={galleryFormData.description}
                  onChange={(e) => setGalleryFormData({...galleryFormData, description: e.target.value})}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  rows={3}
                  placeholder="Describe this photo..."
                  required
                />
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowGalleryForm(false);
                    setGalleryFormData({ image: null, description: '' });
                    setPreviewUrl('');
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Brigade Form Modal */}
      {showBrigadeForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Update Brigade</h2>
            <form onSubmit={handleBrigadeSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Select Brigade</label>
                <select
                  value={brigadeFormData.id}
                  onChange={(e) => setBrigadeFormData({...brigadeFormData, id: e.target.value})}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                >
                  <option value="">Select a brigade</option>
                  {brigadeData.map(brigade => (
                    <option key={brigade.id} value={brigade.id}>
                      {brigade.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Update Type</label>
                <select
                  value={brigadeFormData.updateType}
                  onChange={(e) => setBrigadeFormData({
                    ...brigadeFormData, 
                    updateType: e.target.value as 'info' | 'post'
                  })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                >
                  <option value="info">Update Brigade Information</option>
                  <option value="post">Add New Post</option>
                </select>
              </div>

              {brigadeFormData.updateType === 'info' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Image URL</label>
                    <input
                      type="text"
                      value={brigadeFormData.image}
                      onChange={(e) => setBrigadeFormData({...brigadeFormData, image: e.target.value})}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Leader</label>
                    <input
                      type="text"
                      value={brigadeFormData.leader}
                      onChange={(e) => setBrigadeFormData({...brigadeFormData, leader: e.target.value})}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Meeting Time</label>
                    <input
                      type="text"
                      value={brigadeFormData.meetingTime}
                      onChange={(e) => setBrigadeFormData({...brigadeFormData, meetingTime: e.target.value})}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      placeholder="e.g., Mondays 18:00-19:30"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Post Title</label>
                    <input
                      type="text"
                      value={brigadeFormData.post?.title}
                      onChange={(e) => setBrigadeFormData({
                        ...brigadeFormData, 
                        post: {...brigadeFormData.post!, title: e.target.value}
                      })}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Content</label>
                    <textarea
                      value={brigadeFormData.post?.content}
                      onChange={(e) => setBrigadeFormData({
                        ...brigadeFormData, 
                        post: {...brigadeFormData.post!, content: e.target.value}
                      })}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                      type="date"
                      value={brigadeFormData.post?.date}
                      onChange={(e) => setBrigadeFormData({
                        ...brigadeFormData, 
                        post: {...brigadeFormData.post!, date: e.target.value}
                      })}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Author</label>
                    <input
                      type="text"
                      value={brigadeFormData.post?.author}
                      onChange={(e) => setBrigadeFormData({
                        ...brigadeFormData, 
                        post: {...brigadeFormData.post!, author: e.target.value}
                      })}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                      required
                    />
                  </div>
                </>
              )}

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowBrigadeForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  {brigadeFormData.updateType === 'info' ? 'Update Brigade' : 'Add Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Member Form Modal */}
      {showMemberForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Manage Member</h2>
            <form onSubmit={handleMemberSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Select Brigade</label>
                <select
                  value={memberFormData.brigadeId}
                  onChange={(e) => setMemberFormData({...memberFormData, brigadeId: e.target.value})}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                >
                  <option value="">Select a brigade</option>
                  {brigadeData.map(brigade => (
                    <option key={brigade.id} value={brigade.id}>
                      {brigade.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Action</label>
                <select
                  value={memberFormData.action}
                  onChange={(e) => setMemberFormData({...memberFormData, action: e.target.value as 'add' | 'update'})}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                >
                  <option value="add">Add Member</option>
                  <option value="update">Update Member</option>
                </select>
              </div>

              {memberFormData.action === 'update' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Member ID</label>
                  <input
                    type="text"
                    value={memberFormData.memberId}
                    onChange={(e) => setMemberFormData({...memberFormData, memberId: e.target.value})}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={memberFormData.name}
                  onChange={(e) => setMemberFormData({...memberFormData, name: e.target.value})}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <input
                  type="text"
                  value={memberFormData.role}
                  onChange={(e) => setMemberFormData({...memberFormData, role: e.target.value})}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Join Date</label>
                <input
                  type="date"
                  value={memberFormData.joinDate}
                  onChange={(e) => setMemberFormData({...memberFormData, joinDate: e.target.value})}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={memberFormData.status}
                  onChange={(e) => setMemberFormData({...memberFormData, status: e.target.value as 'active' | 'inactive'})}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Contact</label>
                <input
                  type="text"
                  value={memberFormData.contact}
                  onChange={(e) => setMemberFormData({...memberFormData, contact: e.target.value})}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowMemberForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  {memberFormData.action === 'add' ? 'Add Member' : 'Update Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {notification && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}>
          {notification.message}
        </div>
      )}
    </div>
  );
} 