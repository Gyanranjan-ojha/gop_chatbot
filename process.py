import pymysql
from os import getenv
import traceback
from datetime import datetime
from dotenv import load_dotenv
import json

load_dotenv()

try:
    result = dict()
    mysql_conn = pymysql.connect(
        host=getenv("META_DATA_MYSQL_HOST"),
        user=getenv("META_DATA_MYSQL_USER"),
        password=getenv("META_DATA_MYSQL_PASS"),
        port=int(getenv("MYSQL_PORT")),
        db = getenv("META_DATA_DB")
    )
    cur = mysql_conn.cursor()
    cur.execute("select id,title from games WHERE id IN (69683, 25291,39816,18302,32109,80363,89424,17869, 18343, 24881, 26320)")
    data = cur.fetchall()
    for game_id,title in data:
        result[f'{game_id}']={"title": title,
                              "staff_link":f"https://gameopedia.com/staff/games/{game_id}",
                              "category": dict()}
    
    cur.execute("""SELECT  r.game_id, group_concat(cp.name,',') FROM releases r 
        LEFT join company_roles cpr on cpr.release_id = r.id
        LEFT join companies cp on cp.id = cpr.company_id
        WHERE r.game_id IN (69683, 25291,39816,18302,32109,80363,89424,17869, 18343, 24881, 26320)
        AND cpr.role = 'Developer'
        AND (r.platform_id IS NULL OR r.platform_id = 3)
        AND cp.deleted_at IS NULL 
        AND cpr.deleted_at IS NULL
        AND r.deleted_at IS NULL
        GROUP BY r.game_id;""")
    developer_data = cur.fetchall()
    for game_id, developer in developer_data:
        result[f'{game_id}']['developer'] = developer

    cur.execute("""SELECT distinct r.game_id,p.release_date
                    FROM releases r 
                    JOIN publications p ON r.id = p.release_id
                    WHERE p.locality_id = 16
                    AND r.game_id IN (69683, 25291,39816,18302,32109,80363,89424,17869, 18343, 24881, 26320)
                    AND r.platform_id = 3
                    AND r.deleted_at IS NULL
                    AND p.deleted_at IS NULL
                    AND p.release_date IS NOT NULL
                    GROUP BY r.game_id
                    """)
    release_dates =  cur.fetchall()
    for game_id,release_date in release_dates:
        result[f'{game_id}']['release data'] = release_date
        result[f'{game_id}']['locality'] = "United States (US)"

    cur.execute("""SELECT gc.game_id, ct.name ,
                    group_concat((CASE WHEN gco.value_option_id IS NULL THEN c.name
                    ELSE v.name END )," " ) AS datapoints 
                    FROM game_classifications gc 
                    LEFT JOIN game_classification_options gco ON gc.id = gco.game_classification_id
                    INNER JOIN classifications c ON gc.classification_id = c.id
                    INNER JOIN classification_types ct ON c.classification_type_id = ct.id
                    LEFT JOIN value_options v ON gco.value_option_id =v.id
                    WHERE gc.game_id IN (69683, 25291,39816,18302,32109,80363,89424,17869, 18343, 24881, 26320)
                    AND c.classification_type_id IN (1,16,17,95)
                    AND gc.deleted_at IS NULL
                    AND gco.deleted_at IS NULL
                    AND c.deleted_at IS NULL
                    AND ct.deleted_at IS NULL
                    AND v.deleted_at IS NULL
                    GROUP BY gc.game_id, ct.name """)
    classifications_data = cur.fetchall()
    
    for game_id,category,datapoints in classifications_data:
        result[f'{game_id}']['category'][f'{category}']= datapoints
    
    mysql_conn.close()
    
    # Writing JSON data
    with open('knowledge.json', 'w') as json_file:
        json.dump(list(result.values()), json_file, indent=4) 

except Exception as E:
    print(E)