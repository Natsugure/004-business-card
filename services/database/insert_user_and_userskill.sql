create or replace function insert_user_and_userskill(
  _user_id text,
  _name text,
  _description text,
  _github_id text DEFAULT NULL,
  _qiita_id text DEFAULT NULL,
  _x_id text DEFAULT NULL,
  _skills int[] DEFAULT '{}'
)
returns void
language plpgsql
as $$
begin
  -- ユーザー情報を users テーブルに挿入し、生成された user_id を取得
  insert into users (id, name, description, github_id, qiita_id, x_id)
  values (_user_id, _name, _description, _github_id, _qiita_id, _x_id);

  -- スキル配列を展開して、user_skill テーブルに一括挿入
  insert into user_skill (user_id, skill_id)
  select _user_id, skill_id from unnest(_skills) as skill_id;

  -- 正常終了：何も返さない
  return;
exception
  -- 途中で何らかのエラーが発生した場合、エラーメッセージ付きで例外を投げる
  when others then
    raise exception '登録処理でエラー発生: %', SQLERRM;
end;
$$;
