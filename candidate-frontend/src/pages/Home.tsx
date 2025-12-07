import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useInterviewStore } from '../store/interviewStore'
import { Video } from 'lucide-react'

export default function Home() {
  const [interviewId, setInterviewId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { setInterviewId: storeInterviewId } = useInterviewStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // TODO: Validate interview ID with backend
      console.log('Interview ID:', interviewId)
      storeInterviewId(interviewId)
      // navigate('/device-check')
    } catch (err) {
      setError('Invalid Interview ID. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-primary-100 p-3 rounded-full">
              <Video className="w-6 h-6 text-primary-600" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
            AI Interview Platform
          </h1>
          <p className="text-center text-gray-600 mb-8">Enter your interview ID to begin</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="interviewId" className="block text-sm font-medium text-gray-700 mb-2">
                Interview ID
              </label>
              <input
                id="interviewId"
                type="text"
                value={interviewId}
                onChange={(e) => setInterviewId(e.target.value.toUpperCase())}
                placeholder="e.g., ABC12345"
                required
                maxLength={8}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition uppercase"
              />
              <p className="mt-2 text-xs text-gray-500">
                Check your email for the interview ID
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading || !interviewId}
              className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              {isLoading ? 'Validating...' : 'Continue'}
            </button>
          </form>

          <div className="mt-6 text-center text-gray-600 text-sm">
            <p>First time here?</p>
            <p className="mt-1">Check your email for the interview invitation with your unique ID</p>
          </div>
        </div>
      </div>
    </div>
  )
}
