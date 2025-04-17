import { client } from '@/sanity/lib/client';
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

import MarkdownIt from 'markdown-it';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';

const md = new MarkdownIt();

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;

    const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });

    if (!post) return notFound();

    const parsedContent = md.render(post?.pitch || "");

    return (
        <>
            <section className='!min-h-[230px] pink_container pattern'>
                <p className='tag'>{formatDate(post?._createdAt)}</p>

                <h1 className='heading'>{post.title}</h1>
                <p className='sub-heading !max-w-5xl'>{post.description}</p>
            </section>

            <section className='section_container'>
                <img src={post.image} alt="thumbnail" className='w-full h-auto rounded-xl' />

                <div className='space-y-5 mt-10 max-w-4xl mx-auto'>
                    <div className='flex-between gap-5'>
                        <Link href={`/user/${post.author?._id}`} className='flex gap-2 items-center mb-3'>
                            <Image src={post.author?.image} width={64} height={64} alt="author" className='rounded-full drop-shadow-lg' />

                            <div>
                                <p className='text-[20px] font-medium'>{post.author?.name}</p>
                                <p className='text-[16px] font-medium !text-black-default'>
                                    @{post.author?.username}
                                </p>
                            </div>
                        </Link>

                        <p className='category-tag'>{post.category}</p>
                    </div>

                    <h3 className='text-[30px] font-bold'>Pitch Details</h3>
                    {parsedContent ? (
                        <article
                            className="prose max-w-4xl font-work-sans break-all"
                            dangerouslySetInnerHTML={
                                { __html: parsedContent }
                            } />
                    ) : (
                        <p className='no-result'>No details provided</p>
                    )}
                </div>

                <hr className='divider'/>

                {/* EDITOR SELECTED STARTUP */}

                <Suspense fallback={<Skeleton className='view_skeleton' />}>
                    <View id={id}/>
                </Suspense>
            </section>
        </>
    )
}

export default Page;