import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { fetchCode } from '@/actions/fetchCode';
import { CodeGeneration as codeGeneration } from '@/constants';

import Heading from '@/components/heading';
import CodeGenerationBody from './components/code-body';

const CodeGenerationPage = async () => {
  const { title, api, showReset, icon, bgColor, textColor } = codeGeneration;

  const { userId } = auth();

  if (!userId) {
    redirect('/');
  }

  const code = await fetchCode(userId);

  return (
    <div className='flex h-full flex-col'>
      <Heading
        title={title}
        api={api}
        icon={icon}
        showReset={showReset}
        bgColor={bgColor}
        textColor={textColor}
      />
      <CodeGenerationBody initialPrompts={code} />
    </div>
  );
};

export default CodeGenerationPage;
