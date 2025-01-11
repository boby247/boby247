import * as React from 'react';
import  { useState, useEffect } from 'react';
import styles from './NewWebPart1.module.scss';

import { SPHttpClient } from '@microsoft/sp-http';

// interface MyReactComponentProps {
//   spHttpClient: SPHttpClient;
//   siteUrl: string;
// }

export interface MyReactComponentProps {
  spHttpClient: SPHttpClient;
  siteUrl: string;
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
}


const NewWebPart1: React.FC<MyReactComponentProps> = (props: MyReactComponentProps) => {
  const { spHttpClient, siteUrl } = props;
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cleanedUrl = siteUrl.replace("-admin", "");
        const response = await spHttpClient.get(
          
          `${cleanedUrl}/sites/VIJAY%27S/_api/web/lists/getbytitle('List%20A')/items`,
         //`https://xgcnd.sharepoint.com/sites/VIJAY%27S/_api/web/lists/getbytitle('List%20A')/items`  , // Replace 'Tasks' with your list name
          SPHttpClient.configurations.v1
        );
        
        //const data = await response.json();
        console.log("vijay",response);
        //setItems(data.value);
        if (response.ok) {
          const data = await response.json();
          data.value
          setItems(data.value);
          console.log("1",data.value);
        } else {
          setError(`Error2: ${response.statusText}`);
        }
      } catch (err) {
        setError(`Error1234: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [spHttpClient, siteUrl]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.main}>
      <h3 className={styles.x}>        SharePoint List Items</h3>
      <ul>
        {items.map((item) => (
          <ul>
          <li key={item.Id}>{item.Title}</li>
          <li key={item.Id}>{item.FirstName}</li>
          <li key={item.Id}>{item.LastName}</li>
          <li>3</li>
          </ul>
        ))}
      </ul>
    </div>
  );
};

 export default NewWebPart1;
