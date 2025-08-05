import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';


export async function POST(request: Request) {
  try {
    await dbConnect();

    const { username, message, acceptMessages } = await request.json();

   
    if (typeof acceptMessages === 'boolean') {
      const sessionUser = await UserModel.findOne({ username });

      if (!sessionUser) {
        return Response.json(
          { success: false, message: 'User not found' },
          { status: 404 }
        );
      }

      sessionUser.isAcceptingMessages = acceptMessages;
      await sessionUser.save();

      return Response.json(
        {
          success: true,
          message: `Accept messages turned ${acceptMessages ? 'ON' : 'OFF'}`,
        },
        { status: 200 }
      );
    }

    // ✅ अब normal message भेजने का case
    if (!username || !message) {
      return Response.json(
        { success: false, message: 'Username and message are required' },
        { status: 400 }
      );
    }

    const user = await UserModel.findOne({ username });

    if (!user) {
      return Response.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // अगर user ने acceptMessages बंद किया हुआ है तो reject कर दो
    if (!user.isAcceptingMessages) {
      return Response.json(
        { success: false, message: 'This user is not accepting messages currently.' },
        { status: 403 }
      );
    }

    // ✅ Push new message in user.messages
    (user.messages as any).push({
      content: message,
      createdAt: new Date(),
    });

    await user.save();

    return Response.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in POST /accept-messages:', error);
    return Response.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}


export async function GET(request: Request) {
  try {
    await dbConnect();

    
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (!username) {
      return Response.json(
        { success: false, message: 'Username is required' },
        { status: 400 }
      );
    }

    const user = await UserModel.findOne({ username });

    if (!user) {
      return Response.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        isAcceptingMessages: user.isAcceptingMessages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in GET /accept-messages:', error);
    return Response.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
