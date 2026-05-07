import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.VITE_SUPABASE_URL
if(!SUPABASE_URL) {
  throw new Error('VITE_SUPABASE_URL is not defined')
}

const SUPABASE_PUBLISHABLE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY
if(!SUPABASE_PUBLISHABLE_KEY) {
  throw new Error('VITE_SUPABASE_PUBLISHABLE_KEY is not defined')
}

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY)

async function deleteAllUsers() {
  try {
    const { error: userSkillError } = await supabase
      .from('user_skill')
      .delete()
      .not('id', 'is', null)

    if (userSkillError) {
      throw userSkillError
    }

    const { error: userError } = await supabase
      .from('users')
      .delete()
      .not('id', 'is', null)

    if (userError) {
      throw userError
    }

    console.log('All users and user_skill deleted successfully')

  } catch (e) {
    console.error('Error deleting users and user_skill:', e)
    process.exit(1)
  }
}

await deleteAllUsers()