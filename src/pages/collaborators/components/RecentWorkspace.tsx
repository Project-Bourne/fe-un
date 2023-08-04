import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RecentWork } from "@/utils/constants";
import Service from '@/services/collaborator.service'
import {getWorkspace} from '../types'

function RecentWorkspace() {
  const service = new Service();
  const [workSpace, setWorkSpace] = useState<getWorkspace[]>([]);
 
  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const response = await service.getWorkspace();
        setWorkSpace(response);
        console.log(workSpace,'RecentWork')
      } catch (error) {
        console.error('Error fetching workspaces:', error.message);
      }
    };
    fetchWorkspaces();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5 mx-5">
      {workSpace.map((item, index) => (
        <div key={index} className="border bg-sirp-secondary2 rounded-[1rem]">
          <div className="flex flex-col py-4 px-4 border-b-2">
            <div>
              <h2 className="font-bold">{item.spaceName}</h2>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
            <div className="border mt-[1rem] w-100% pb-2 pt-2 capitalize text-center hover:bg-sirp-primary hover:text-white text-sirp-primary font-bold rounded-[1rem] border-sirp-primary">
              <Link href="/documents" className="cursor-pointer">
                <span>Invite Collaborators</span>
              </Link>
            </div>
          </div>
          <div className="px-5 py-5">
            <h2 className="font-bold">Recent Collaborators</h2>
            <Image
              src={require(`../../../assets/icons/groupAvatar.svg`)}
              alt="documents"
              className="cursor-pointer mt-5"
              width={300}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecentWorkspace;
